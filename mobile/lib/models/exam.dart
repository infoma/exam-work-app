class ExamProject {
  final String id;
  final String name;
  final String? type;
  final DateTime? startTime;
  final DateTime? endTime;
  final String? status;
  final String? description;
  final int? siteCount;
  final int? candidateCount;

  ExamProject({
    required this.id,
    required this.name,
    this.type,
    this.startTime,
    this.endTime,
    this.status,
    this.description,
    this.siteCount,
    this.candidateCount,
  });

  factory ExamProject.fromJson(Map<String, dynamic> json) {
    return ExamProject(
      id: json['id'] as String,
      name: json['name'] as String,
      type: json['type'] as String?,
      startTime: json['startTime'] != null
          ? DateTime.parse(json['startTime'])
          : null,
      endTime: json['endTime'] != null
          ? DateTime.parse(json['endTime'])
          : null,
      status: json['status'] as String?,
      description: json['description'] as String?,
      siteCount: json['siteCount'] as int?,
      candidateCount: json['candidateCount'] as int?,
    );
  }

  Map<String, dynamic> toJson() {
    return {
      'id': id,
      'name': name,
      'type': type,
      'startTime': startTime?.toIso8601String(),
      'endTime': endTime?.toIso8601String(),
      'status': status,
      'description': description,
      'siteCount': siteCount,
      'candidateCount': candidateCount,
    };
  }
}