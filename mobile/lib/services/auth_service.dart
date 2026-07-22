import '../models/user.dart';
import 'api_client.dart';

class AuthService {
  final ApiClient _api = ApiClient();

  Future<Map<String, dynamic>> login(String username, String password) async {
    final result = await _api.post(
      '/auth/login',
      data: {
        'username': username,
        'password': password,
      },
    );
    return result;
  }

  Future<User> getCurrentUser() async {
    final result = await _api.get('/auth/me');
    return User.fromJson(result);
  }

  Future<List<dynamic>> getMyRoles() async {
    final result = await _api.get('/rbac/my-roles');
    return result;
  }

  Future<List<dynamic>> getMyPermissions() async {
    final result = await _api.get('/rbac/my-permissions');
    return result;
  }

  Future<void> logout() async {
    await _api.clearToken();
  }
}