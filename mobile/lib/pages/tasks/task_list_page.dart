import 'package:flutter/material.dart';

class TaskListPage extends StatefulWidget {
  const TaskListPage({super.key});

  @override
  State<TaskListPage> createState() => _TaskListPageState();
}

class _TaskListPageState extends State<TaskListPage>
    with SingleTickerProviderStateMixin {
  late TabController _tabController;

  @override
  void initState() {
    super.initState();
    _tabController = TabController(length: 4, vsync: this);
  }

  @override
  void dispose() {
    _tabController.dispose();
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: const Text('任务中心'),
        bottom: TabBar(
          controller: _tabController,
          isScrollable: true,
          tabs: const [
            Tab(text: '全部'),
            Tab(text: '待处理'),
            Tab(text: '进行中'),
            Tab(text: '已完成'),
          ],
        ),
      ),
      body: TabBarView(
        controller: _tabController,
        children: [
          _buildTaskList('all'),
          _buildTaskList('pending'),
          _buildTaskList('in_progress'),
          _buildTaskList('completed'),
        ],
      ),
      floatingActionButton: FloatingActionButton(
        onPressed: () {},
        child: const Icon(Icons.add),
      ),
    );
  }

  Widget _buildTaskList(String status) {
    final tasks = _getMockTasks(status);
    
    if (tasks.isEmpty) {
      return const Center(child: Text('暂无任务'));
    }

    return ListView.builder(
      padding: const EdgeInsets.all(16),
      itemCount: tasks.length,
      itemBuilder: (context, index) {
        final task = tasks[index];
        return _buildTaskCard(task);
      },
    );
  }

  List<Map<String, dynamic>> _getMockTasks(String status) {
    final allTasks = [
      {'id': '1', 'title': '检查考场布置', 'status': 'pending', 'priority': 'high', 'deadline': '今天 14:00', 'site': '第一考点'},
      {'id': '2', 'title': '分发考试试卷', 'status': 'in_progress', 'priority': 'high', 'deadline': '今天 08:30', 'site': '第二考点'},
      {'id': '3', 'title': '核对考生名单', 'status': 'completed', 'priority': 'medium', 'deadline': '昨天', 'site': '第一考点'},
      {'id': '4', 'title': '设备调试', 'status': 'pending', 'priority': 'medium', 'deadline': '明天 09:00', 'site': '第三考点'},
      {'id': '5', 'title': '考务人员培训', 'status': 'completed', 'priority': 'low', 'deadline': '前天', 'site': '总部'},
    ];

    if (status == 'all') return allTasks;
    return allTasks.where((t) => t['status'] == status).toList();
  }

  Widget _buildTaskCard(Map<String, dynamic> task) {
    Color priorityColor;
    String priorityText;
    switch (task['priority']) {
      case 'high':
        priorityColor = Colors.red;
        priorityText = '紧急';
        break;
      case 'medium':
        priorityColor = Colors.orange;
        priorityText = '重要';
        break;
      default:
        priorityColor = Colors.blue;
        priorityText = '普通';
    }

    Color statusColor;
    String statusText;
    switch (task['status']) {
      case 'pending':
        statusColor = Colors.grey;
        statusText = '待处理';
        break;
      case 'in_progress':
        statusColor = Colors.blue;
        statusText = '进行中';
        break;
      case 'completed':
        statusColor = Colors.green;
        statusText = '已完成';
        break;
      default:
        statusColor = Colors.grey;
        statusText = '未知';
    }

    return Card(
      margin: const EdgeInsets.only(bottom: 12),
      child: InkWell(
        onTap: () {},
        borderRadius: BorderRadius.circular(12),
        child: Padding(
          padding: const EdgeInsets.all(16),
          child: Column(
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              Row(
                children: [
                  Expanded(
                    child: Text(
                      task['title'],
                      style: const TextStyle(
                        fontSize: 16,
                        fontWeight: FontWeight.w600,
                      ),
                    ),
                  ),
                  Container(
                    padding: const EdgeInsets.symmetric(
                      horizontal: 8,
                      vertical: 2,
                    ),
                    decoration: BoxDecoration(
                      color: priorityColor.withOpacity(0.1),
                      borderRadius: BorderRadius.circular(8),
                    ),
                    child: Text(
                      priorityText,
                      style: TextStyle(
                        fontSize: 11,
                        color: priorityColor,
                      ),
                    ),
                  ),
                ],
              ),
              const SizedBox(height: 12),
              Row(
                children: [
                  Icon(Icons.location_on, size: 14, color: Colors.grey[500]),
                  const SizedBox(width: 4),
                  Text(task['site'],
                      style: TextStyle(fontSize: 13, color: Colors.grey[600])),
                  const Spacer(),
                  Container(
                    padding: const EdgeInsets.symmetric(
                      horizontal: 8,
                      vertical: 2,
                    ),
                    decoration: BoxDecoration(
                      color: statusColor.withOpacity(0.1),
                      borderRadius: BorderRadius.circular(8),
                    ),
                    child: Text(
                      statusText,
                      style: TextStyle(
                        fontSize: 11,
                        color: statusColor,
                      ),
                    ),
                  ),
                ],
              ),
              const SizedBox(height: 8),
              Row(
                children: [
                  Icon(Icons.access_time, size: 14, color: Colors.grey[500]),
                  const SizedBox(width: 4),
                  Text(
                    '截止：${task['deadline']}',
                    style: TextStyle(fontSize: 13, color: Colors.grey[600]),
                  ),
                ],
              ),
            ],
          ),
        ),
      ),
    );
  }
}