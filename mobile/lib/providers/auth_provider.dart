import 'package:flutter/foundation.dart';
import 'package:shared_preferences/shared_preferences.dart';
import 'dart:convert';
import '../models/user.dart';
import '../services/auth_service.dart';
import '../config/api_config.dart';

class AuthProvider with ChangeNotifier {
  User? _user;
  String? _token;
  bool _isLoading = false;
  final AuthService _authService = AuthService();

  User? get user => _user;
  String? get token => _token;
  bool get isLoading => _isLoading;
  bool get isLoggedIn => _token != null && _user != null;

  Future<bool> tryAutoLogin() async {
    final prefs = await SharedPreferences.getInstance();
    final token = prefs.getString(ApiConfig.tokenKey);
    final userJson = prefs.getString(ApiConfig.userInfoKey);

    if (token == null || userJson == null) {
      return false;
    }

    try {
      _token = token;
      _user = User.fromJson(json.decode(userJson));
      notifyListeners();
      return true;
    } catch (e) {
      return false;
    }
  }

  Future<void> login(String username, String password) async {
    _isLoading = true;
    notifyListeners();

    try {
      final result = await _authService.login(username, password);
      _token = result['accessToken'];
      _user = User.fromJson(result['user']);

      final prefs = await SharedPreferences.getInstance();
      await prefs.setString(ApiConfig.tokenKey, _token!);
      await prefs.setString(ApiConfig.userInfoKey, json.encode(_user!.toJson()));

      _isLoading = false;
      notifyListeners();
    } catch (e) {
      _isLoading = false;
      notifyListeners();
      rethrow;
    }
  }

  Future<void> logout() async {
    await _authService.logout();
    _token = null;
    _user = null;

    final prefs = await SharedPreferences.getInstance();
    await prefs.remove(ApiConfig.tokenKey);
    await prefs.remove(ApiConfig.userInfoKey);

    notifyListeners();
  }
}