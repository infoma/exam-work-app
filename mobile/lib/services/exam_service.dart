import '../models/exam.dart';
import 'api_client.dart';

class ExamService {
  final ApiClient _api = ApiClient();

  Future<List<ExamProject>> getExams({int page = 1, int pageSize = 20}) async {
    final result = await _api.get(
      '/exams',
      params: {'page': page, 'pageSize': pageSize},
    );
    if (result is List) {
      return result.map((e) => ExamProject.fromJson(e)).toList();
    }
    return [];
  }

  Future<ExamProject> getExamDetail(String id) async {
    final result = await _api.get('/exams/$id');
    return ExamProject.fromJson(result);
  }
}