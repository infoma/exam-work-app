import 'package:flutter/material.dart';

class IncidentListPage extends StatefulWidget {
  const IncidentListPage({super.key});

  @override
  State<IncidentListPage> createState() => _IncidentListPageState();
}

class _IncidentListPageState extends State<IncidentListPage>
    with SingleTickerProviderStateMixin {
  late TabController _tabController;

  @override
  void initState() {
    super.initState();
    _tabController = TabController(length: 3, vsync: this);
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
        title: const Text('异常事件'),
        bottom: TabBar(
          controller: _tabController,
          tabs: const [
            Tab(text: '全部'),
            Tab(text: '处理中'),
            Tab(text: '已闭环'),
          ],
        ),
      ),
      body: TabBarView(
        controller: _tabController,
        children: [
          _buildIncidentList('all'),
          _buildIncidentList('open'),
          _buildIncidentList('closed'),
        ],
      ),
      floatingActionButton: FloatingActionButton.extended(
        onPressed: () {
          _showReportSheet();
        },
        icon: const Icon(Icons.add_alert),
        label: const Text('上报异常'),
      ),
    );
  }

  void _showReportSheet() {
    showModalBottomSheet(
      context: context,
      isScrollControlled: true,
      builder: (context) => Padding(
        padding: EdgeInsets.only(
          bottom: MediaQuery.of(context).viewInsets.bottom,
        ),
        child: Container(
          padding: const EdgeInsets.all(24),
          child: Column(
            mainAxisSize: MainAxisSize.min,
            crossAxisAlignment: CrossAxisAlignment.stretch,
            children: [
              const Text(
                '上报异常事件',
                style: TextStyle(
                  fontSize: 18,
                  fontWeight: FontWeight.bold,
                ),
              ),
              const SizedBox(height: 20),
              TextFormField(
                decoration: const InputDecoration(
                  labelText: '异常标题',
                  hintText: '请简要描述异常情况',
                ),
              ),
              const SizedBox(height: 16),
              DropdownButtonFormField<String>(
                decoration: const InputDecoration(labelText: '异常级别'),
                items: const [
                  DropdownMenuItem(value: 'normal', child: Text('普通')),
                  DropdownMenuItem(value: 'important', child: Text('重要')),
                  DropdownMenuItem(value: 'major', child: Text('重大')),
                ],
                onChanged: (value) {},
              ),
              const SizedBox(height: 16),
              TextFormField(
                maxLines: 4,
                decoration: const InputDecoration(
                  labelText: '详细描述',
                  hintText: '请详细描述异常发生的时间、地点、经过等',
                  alignLabelWithHint: true,
                ),
              ),
              const SizedBox(height: 24),
              ElevatedButton(
                onPressed: () {
                  Navigator.pop(context);
                  ScaffoldMessenger.of(context).showSnackBar(
                    const SnackBar(content: Text('上报成功')),
                  );
                },
                child: const Text('提交上报'),
              ),
            ],
          ),
        ),
      ),
    );
  }

  Widget _buildIncidentList(String status) {
    final incidents = _getMockIncidents(status);

    if (incidents.isEmpty) {
      return const Center(child: Text('暂无异常事件'));
    }

    return ListView.builder(
      padding: const EdgeInsets.all(16),
      itemCount: incidents.length,
      itemBuilder: (context, index) {
        final incident = incidents[index];
        return _buildIncidentCard(incident);
      },
    );
  }

  List<Map<String, dynamic>> _getMockIncidents(String status) {
    final allIncidents = [
      {
        'id': '1',
        'title': '考场空调故障',
        'level': 'important',
        'status': 'open',
        'type': '设备故障',
        'site': '第一考点 302室',
        'time': '今天 10:30',
        'reporter': '张三',
      },
      {
        'id': '2',
        'title': '考生迟到超30分钟',
        'level': 'normal',
        'status': 'closed',
        'type': '考务异常',
        'site': '第二考点 105室',
        'time': '今天 09:15',
        'reporter': '李四',
      },
      {
        'id': '3',
        'title': '试卷袋密封异常',
        'level': 'major',
        'status': 'open',
        'type': '试卷问题',
        'site': '第三考点 保密室',
        'time': '今天 08:00',
        'reporter': '王五',
      },
    ];

    if (status == 'all') return allIncidents;
    if (status == 'open') {
      return allIncidents.where((i) => i['status'] == 'open').toList();
    }
    return allIncidents.where((i) => i['status'] == 'closed').toList();
  }

  Widget _buildIncidentCard(Map<String, dynamic> incident) {
    Color levelColor;
    String levelText;
    switch (incident['level']) {
      case 'major':
        levelColor = Colors.red;
        levelText = '重大';
        break;
      case 'important':
        levelColor = Colors.orange;
        levelText = '重要';
        break;
      default:
        levelColor = Colors.blue;
        levelText = '普通';
    }

    bool isClosed = incident['status'] == 'closed';

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
                      incident['title'],
                      style: const TextStyle(
                        fontSize: 16,
                        fontWeight: FontWeight.w600,
                      ),
                    ),
                  ),
                  Container(
                    padding: const EdgeInsets.symmetric(
                      horizontal: 10,
                      vertical: 4,
                    ),
                    decoration: BoxDecoration(
                      color: levelColor.withOpacity(0.1),
                      borderRadius: BorderRadius.circular(12),
                    ),
                    child: Text(
                      levelText,
                      style: TextStyle(
                        fontSize: 12,
                        color: levelColor,
                        fontWeight: FontWeight.w600,
                      ),
                    ),
                  ),
                ],
              ),
              const SizedBox(height: 12),
              Row(
                children: [
                  Icon(Icons.category, size: 14, color: Colors.grey[500]),
                  const SizedBox(width: 4),
                  Text(incident['type'],
                      style: TextStyle(fontSize: 13, color: Colors.grey[600])),
                  const SizedBox(width: 16),
                  Icon(Icons.location_on, size: 14, color: Colors.grey[500]),
                  const SizedBox(width: 4),
                  Expanded(
                    child: Text(incident['site'],
                        style:
                            TextStyle(fontSize: 13, color: Colors.grey[600])),
                  ),
                ],
              ),
              const SizedBox(height: 8),
              Row(
                children: [
                  Icon(Icons.access_time, size: 14, color: Colors.grey[500]),
                  const SizedBox(width: 4),
                  Text(incident['time'],
                      style: TextStyle(fontSize: 13, color: Colors.grey[600])),
                  const SizedBox(width: 16),
                  Icon(Icons.person, size: 14, color: Colors.grey[500]),
                  const SizedBox(width: 4),
                  Text(incident['reporter'],
                      style: TextStyle(fontSize: 13, color: Colors.grey[600])),
                  const Spacer(),
                  Icon(
                    isClosed ? Icons.check_circle : Icons.pending_actions,
                    size: 16,
                    color: isClosed ? Colors.green : Colors.orange,
                  ),
                  const SizedBox(width: 4),
                  Text(
                    isClosed ? '已闭环' : '处理中',
                    style: TextStyle(
                      fontSize: 12,
                      color: isClosed ? Colors.green : Colors.orange,
                    ),
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