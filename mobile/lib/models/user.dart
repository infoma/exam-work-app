class User {
  final String id;
  final String username;
  final String? realName;
  final String? phone;
  final String? orgId;
  final String? status;

  User({
    required this.id,
    required this.username,
    this.realName,
    this.phone,
    this.orgId,
    this.status,
  });

  factory User.fromJson(Map<String, dynamic> json) {
    return User(
      id: json['id'] as String,
      username: json['username'] as String,
      realName: json['realName'] as String?,
      phone: json['phone'] as String?,
      orgId: json['orgId'] as String?,
      status: json['status'] as String?,
    );
  }

  Map<String, dynamic> toJson() {
    return {
      'id': id,
      'username': username,
      'realName': realName,
      'phone': phone,
      'orgId': orgId,
      'status': status,
    };
  }

  User copyWith({
    String? id,
    String? username,
    String? realName,
    String? phone,
    String? orgId,
    String? status,
  }) {
    return User(
      id: id ?? this.id,
      username: username ?? this.username,
      realName: realName ?? this.realName,
      phone: phone ?? this.phone,
      orgId: orgId ?? this.orgId,
      status: status ?? this.status,
    );
  }
}