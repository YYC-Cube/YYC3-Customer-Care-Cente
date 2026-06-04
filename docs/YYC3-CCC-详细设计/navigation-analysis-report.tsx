/**
 * @file 导航栏功能分析报告
 * @description 提供系统导航栏功能的完善度分析和优化建议
 * @component NavigationAnalysisReport
 * @author YYC³
 * @version 1.0.0
 * @created 2026-01-23
 * @updated 2026-01-23
 * @copyright Copyright (c) 2026 YYC³
 * @license MIT
 */

'use client';

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  CheckCircle,
  AlertTriangle,
  XCircle,
  Target,
  Users,
  Settings,
  BarChart3,
  Shield,
  Home,
  Package,
  Star,
  Zap,
  Activity,
} from 'lucide-react';

// 导航栏功能分析数据
const navigationAnalysis = {
  overall: {
    completeness: 75,
    usability: 82,
    performance: 88,
    accessibility: 70,
  },
  modules: [
    {
      id: 'dashboard',
      name: '综合看板',
      icon: 'Home',
      status: '完成',
      completeness: 95,
      features: ['数据统计', '图表展示', '快速操作', '系统状态'],
      issues: ['缺少实时数据更新'],
      priority: '高',
    },
    {
      id: 'customers',
      name: '客户管理',
      icon: 'Users',
      status: '进行中',
      completeness: 80,
      features: ['客户列表', '详情查看', '编辑功能', '搜索筛选'],
      issues: ['缺少批量操作', '导出功能待完善'],
      priority: '高',
    },
    {
      id: 'tasks',
      name: '任务管理',
      icon: 'CheckSquare',
      status: '进行中',
      completeness: 75,
      features: ['任务看板', '状态管理', '分配功能', '时间跟踪'],
      issues: ['缺少依赖关系', '通知提醒待完善'],
      priority: '高',
    },
    {
      id: 'finance',
      name: '财务中心',
      icon: 'DollarSign',
      status: '开发中',
      completeness: 60,
      features: ['基础框架', '数据展示'],
      issues: ['核心功能未实现', '报表功能缺失'],
      priority: '中',
    },
    {
      id: 'approval',
      name: 'OA审批',
      icon: 'FileCheck',
      status: '规划中',
      completeness: 40,
      features: ['基础界面'],
      issues: ['工作流引擎未实现', '表单配置缺失'],
      priority: '中',
    },
    {
      id: 'communication',
      name: '内部沟通',
      icon: 'MessageCircle',
      status: '规划中',
      completeness: 35,
      features: ['基础界面'],
      issues: ['实时通信未实现', '文件分享功能缺失'],
      priority: '中',
    },
    {
      id: 'okr',
      name: 'OKR管理',
      icon: 'Target',
      status: '开发中',
      completeness: 50,
      features: ['目标设置', '进度跟踪'],
      issues: ['评估功能待完善', '团队协作功能缺失'],
      priority: '低',
    },
    {
      id: 'kpi',
      name: 'KPI跟踪',
      icon: 'BarChart3',
      status: '开发中',
      completeness: 45,
      features: ['指标展示', '图表分析'],
      issues: ['自定义指标功能缺失', '预警机制待实现'],
      priority: '低',
    },
    {
      id: 'analytics',
      name: '数据分析',
      icon: 'TrendingUp',
      status: '规划中',
      completeness: 30,
      features: ['基础图表'],
      issues: ['高级分析功能缺失', '数据源集成待完善'],
      priority: '低',
    },
    {
      id: 'notifications',
      name: '通知中心',
      icon: 'Bell',
      status: '规划中',
      completeness: 25,
      features: ['基础界面'],
      issues: ['实时通知未实现', '消息分类功能缺失'],
      priority: '中',
    },
    {
      id: 'permissions',
      name: '权限管理',
      icon: 'Shield',
      status: '规划中',
      completeness: 20,
      features: ['基础界面'],
      issues: ['角色权限系统未实现', '数据权限控制缺失'],
      priority: '高',
    },
  ],
  usabilityIssues: [
    {
      category: '导航体验',
      issues: [
        '侧边栏折叠状态下缺少快速访问功能',
        '移动端导航体验需要优化',
        '面包屑导航缺失',
        '快捷键支持不足',
      ],
      severity: '中',
    },
    {
      category: '视觉设计',
      issues: [
        '激活状态指示不够明显',
        '图标与功能匹配度有待提升',
        '颜色对比度需要优化',
        '加载状态反馈不足',
      ],
      severity: '低',
    },
    {
      category: '交互反馈',
      issues: [
        '点击反馈延迟',
        '悬停效果不一致',
        '错误状态处理不完善',
        '成功操作反馈缺失',
      ],
      severity: '中',
    },
  ],
  recommendations: [
    {
      title: '优先完善核心模块',
      description: '重点完善客户管理、任务管理和权限管理模块',
      impact: '高',
      effort: '中',
      timeline: '2-3周',
    },
    {
      title: '改进导航体验',
      description: '添加面包屑导航、快捷键支持和搜索功能',
      impact: '中',
      effort: '低',
      timeline: '1周',
    },
    {
      title: '统一视觉设计',
      description: '规范图标使用、颜色方案和交互状态',
      impact: '中',
      effort: '低',
      timeline: '1周',
    },
    {
      title: '移动端优化',
      description: '优化移动端导航体验和响应式布局',
      impact: '中',
      effort: '中',
      timeline: '2周',
    },
    {
      title: '性能优化',
      description: '优化导航切换性能和页面加载速度',
      impact: '中',
      effort: '中',
      timeline: '1-2周',
    },
  ],
};

export function NavigationAnalysisReport() {
  const getStatusColor = (status: string) => {
    switch (status) {
      case '完成':
        return 'bg-emerald-100 text-emerald-700 border-emerald-200';
      case '进行中':
        return 'bg-blue-100 text-blue-700 border-blue-200';
      case '开发中':
        return 'bg-yellow-100 text-yellow-700 border-yellow-200';
      case '规划中':
        return 'bg-orange-100 text-orange-700 border-orange-200';
      default:
        return 'bg-gray-100 text-gray-700 border-gray-200';
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case '高':
        return 'bg-red-100 text-red-700 border-red-200';
      case '中':
        return 'bg-yellow-100 text-yellow-700 border-yellow-200';
      case '低':
        return 'bg-green-100 text-green-700 border-green-200';
      default:
        return 'bg-gray-100 text-gray-700 border-gray-200';
    }
  };

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case '高':
        return 'text-red-600';
      case '中':
        return 'text-yellow-600';
      case '低':
        return 'text-green-600';
      default:
        return 'text-gray-600';
    }
  };

  const getImpactColor = (impact: string) => {
    switch (impact) {
      case '高':
        return 'bg-red-50 text-red-700 border-red-200';
      case '中':
        return 'bg-yellow-50 text-yellow-700 border-yellow-200';
      case '低':
        return 'bg-green-50 text-green-700 border-green-200';
      default:
        return 'bg-gray-50 text-gray-700 border-gray-200';
    }
  };

  return (
    <div className="p-6 space-y-6 bg-gradient-to-br from-sky-50/50 to-blue-50/30 min-h-full">
      {/* 报告标题 */}
      <div className="text-center space-y-4">
        <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-sky-400 to-blue-500 rounded-2xl shadow-lg">
          <Activity className="w-8 h-8 text-white" />
        </div>
        <div>
          <h1 className="text-3xl font-bold bg-gradient-to-r from-sky-600 to-blue-600 bg-clip-text text-transparent">
            导航栏功能完善度分析报告
          </h1>
          <p className="text-slate-600 mt-2">企业管理系统全局审核与优化建议</p>
          <p className="text-sm text-slate-500">
            生成时间: {new Date().toLocaleDateString('zh-CN')} • 版本: v1.0
          </p>
        </div>
      </div>

      <Tabs defaultValue="overview" className="w-full">
        <TabsList className="bg-sky-100/50 border border-sky-200 mb-6">
          <TabsTrigger
            value="overview"
            className="data-[state=active]:bg-white data-[state=active]:text-sky-700"
          >
            <BarChart3 className="w-4 h-4 mr-2" />
            总体概览
          </TabsTrigger>
          <TabsTrigger
            value="modules"
            className="data-[state=active]:bg-white data-[state=active]:text-sky-700"
          >
            <Package className="w-4 h-4 mr-2" />
            模块分析
          </TabsTrigger>
          <TabsTrigger
            value="issues"
            className="data-[state=active]:bg-white data-[state=active]:text-sky-700"
          >
            <AlertTriangle className="w-4 h-4 mr-2" />
            问题识别
          </TabsTrigger>
          <TabsTrigger
            value="recommendations"
            className="data-[state=active]:bg-white data-[state=active]:text-sky-700"
          >
            <Star className="w-4 h-4 mr-2" />
            优化建议
          </TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          {/* 整体评分 */}
          <Card className="border-sky-200 shadow-sm bg-white/80 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Target className="w-5 h-5 text-sky-600" />
                <span>整体评分</span>
              </CardTitle>
              <CardDescription>导航栏各维度功能完善度评估</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <div className="text-center">
                  <div className="w-20 h-20 bg-gradient-to-br from-blue-400 to-sky-500 rounded-3xl flex items-center justify-center mx-auto mb-3">
                    <CheckCircle className="w-10 h-10 text-white" />
                  </div>
                  <h3 className="font-semibold text-slate-800 mb-1">
                    功能完整性
                  </h3>
                  <div className="text-3xl font-bold text-blue-600 mb-2">
                    {navigationAnalysis.overall.completeness}%
                  </div>
                  <Progress
                    value={navigationAnalysis.overall.completeness}
                    className="h-2"
                  />
                </div>

                <div className="text-center">
                  <div className="w-20 h-20 bg-gradient-to-br from-emerald-400 to-teal-500 rounded-3xl flex items-center justify-center mx-auto mb-3">
                    <Users className="w-10 h-10 text-white" />
                  </div>
                  <h3 className="font-semibold text-slate-800 mb-1">
                    用户体验
                  </h3>
                  <div className="text-3xl font-bold text-emerald-600 mb-2">
                    {navigationAnalysis.overall.usability}%
                  </div>
                  <Progress
                    value={navigationAnalysis.overall.usability}
                    className="h-2"
                  />
                </div>

                <div className="text-center">
                  <div className="w-20 h-20 bg-gradient-to-br from-purple-400 to-indigo-500 rounded-3xl flex items-center justify-center mx-auto mb-3">
                    <Zap className="w-10 h-10 text-white" />
                  </div>
                  <h3 className="font-semibold text-slate-800 mb-1">
                    性能表现
                  </h3>
                  <div className="text-3xl font-bold text-purple-600 mb-2">
                    {navigationAnalysis.overall.performance}%
                  </div>
                  <Progress
                    value={navigationAnalysis.overall.performance}
                    className="h-2"
                  />
                </div>

                <div className="text-center">
                  <div className="w-20 h-20 bg-gradient-to-br from-orange-400 to-red-500 rounded-3xl flex items-center justify-center mx-auto mb-3">
                    <Shield className="w-10 h-10 text-white" />
                  </div>
                  <h3 className="font-semibold text-slate-800 mb-1">
                    可访问性
                  </h3>
                  <div className="text-3xl font-bold text-orange-600 mb-2">
                    {navigationAnalysis.overall.accessibility}%
                  </div>
                  <Progress
                    value={navigationAnalysis.overall.accessibility}
                    className="h-2"
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* 模块状态统计 */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card className="border-sky-200 shadow-sm bg-white/80 backdrop-blur-sm">
              <CardHeader>
                <CardTitle>模块开发状态</CardTitle>
                <CardDescription>各功能模块的开发进度分布</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-3 bg-emerald-50/50 rounded-lg">
                    <div className="flex items-center space-x-3">
                      <CheckCircle className="w-5 h-5 text-emerald-500" />
                      <span className="font-medium text-slate-800">已完成</span>
                    </div>
                    <div className="text-lg font-bold text-emerald-600">
                      {
                        navigationAnalysis.modules.filter(
                          (m) => m.status === '完成'
                        ).length
                      }
                    </div>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-blue-50/50 rounded-lg">
                    <div className="flex items-center space-x-3">
                      <Activity className="w-5 h-5 text-blue-500" />
                      <span className="font-medium text-slate-800">进行中</span>
                    </div>
                    <div className="text-lg font-bold text-blue-600">
                      {
                        navigationAnalysis.modules.filter(
                          (m) => m.status === '进行中'
                        ).length
                      }
                    </div>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-yellow-50/50 rounded-lg">
                    <div className="flex items-center space-x-3">
                      <Settings className="w-5 h-5 text-yellow-500" />
                      <span className="font-medium text-slate-800">开发中</span>
                    </div>
                    <div className="text-lg font-bold text-yellow-600">
                      {
                        navigationAnalysis.modules.filter(
                          (m) => m.status === '开发中'
                        ).length
                      }
                    </div>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-orange-50/50 rounded-lg">
                    <div className="flex items-center space-x-3">
                      <AlertTriangle className="w-5 h-5 text-orange-500" />
                      <span className="font-medium text-slate-800">规划中</span>
                    </div>
                    <div className="text-lg font-bold text-orange-600">
                      {
                        navigationAnalysis.modules.filter(
                          (m) => m.status === '规划中'
                        ).length
                      }
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-sky-200 shadow-sm bg-white/80 backdrop-blur-sm">
              <CardHeader>
                <CardTitle>优先级分布</CardTitle>
                <CardDescription>模块开发优先级统计</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-slate-600">高优先级模块</span>
                    <div className="flex items-center space-x-2">
                      <div className="w-20 bg-sky-100 rounded-full h-2">
                        <div className="bg-gradient-to-r from-red-400 to-red-500 h-2 rounded-full w-1/2" />
                      </div>
                      <span className="font-medium text-red-600">
                        {
                          navigationAnalysis.modules.filter(
                            (m) => m.priority === '高'
                          ).length
                        }
                        个
                      </span>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-slate-600">中优先级模块</span>
                    <div className="flex items-center space-x-2">
                      <div className="w-20 bg-sky-100 rounded-full h-2">
                        <div className="bg-gradient-to-r from-yellow-400 to-yellow-500 h-2 rounded-full w-1/3" />
                      </div>
                      <span className="font-medium text-yellow-600">
                        {
                          navigationAnalysis.modules.filter(
                            (m) => m.priority === '中'
                          ).length
                        }
                        个
                      </span>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-slate-600">低优先级模块</span>
                    <div className="flex items-center space-x-2">
                      <div className="w-20 bg-sky-100 rounded-full h-2">
                        <div className="bg-gradient-to-r from-green-400 to-green-500 h-2 rounded-full w-1/4" />
                      </div>
                      <span className="font-medium text-green-600">
                        {
                          navigationAnalysis.modules.filter(
                            (m) => m.priority === '低'
                          ).length
                        }
                        个
                      </span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="modules" className="space-y-6">
          <Card className="border-sky-200 shadow-sm bg-white/80 backdrop-blur-sm">
            <CardHeader>
              <CardTitle>模块详细分析</CardTitle>
              <CardDescription>各功能模块的完善度和存在问题</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {navigationAnalysis.modules.map((module, index) => (
                  <div
                    key={index}
                    className="border rounded-xl p-4 hover:shadow-sm transition-all duration-200 bg-sky-50/30"
                  >
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 bg-gradient-to-br from-sky-400 to-blue-500 rounded-xl flex items-center justify-center">
                          <Home className="w-5 h-5 text-white" />
                        </div>
                        <div>
                          <h4 className="font-medium text-slate-800">
                            {module.name}
                          </h4>
                          <p className="text-sm text-slate-500">
                            ID: {module.id}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Badge
                          variant="outline"
                          className={getStatusColor(module.status)}
                        >
                          {module.status}
                        </Badge>
                        <Badge
                          variant="outline"
                          className={getPriorityColor(module.priority)}
                        >
                          {module.priority}优先级
                        </Badge>
                      </div>
                    </div>

                    <div className="mb-3">
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-sm font-medium text-slate-600">
                          完善度
                        </span>
                        <span className="text-sm font-bold text-slate-800">
                          {module.completeness}%
                        </span>
                      </div>
                      <div className="w-full bg-sky-100 rounded-full h-2">
                        <div
                          className="bg-gradient-to-r from-sky-400 to-blue-500 h-2 rounded-full transition-all duration-500"
                          style={{ width: `${module.completeness}%` }}
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <h5 className="font-medium text-slate-800 mb-2 flex items-center">
                          <CheckCircle className="w-4 h-4 mr-2 text-emerald-500" />
                          已实现功能
                        </h5>
                        <div className="flex flex-wrap gap-1">
                          {module.features.map((feature, featureIndex) => (
                            <Badge
                              key={featureIndex}
                              variant="outline"
                              className="text-xs bg-emerald-50 text-emerald-700 border-emerald-200"
                            >
                              {feature}
                            </Badge>
                          ))}
                        </div>
                      </div>

                      <div>
                        <h5 className="font-medium text-slate-800 mb-2 flex items-center">
                          <XCircle className="w-4 h-4 mr-2 text-red-500" />
                          待解决问题
                        </h5>
                        <ul className="space-y-1">
                          {module.issues.map((issue, issueIndex) => (
                            <li
                              key={issueIndex}
                              className="text-sm text-red-600 flex items-center"
                            >
                              <div className="w-1.5 h-1.5 bg-red-400 rounded-full mr-2" />
                              {issue}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="issues" className="space-y-6">
          <Card className="border-sky-200 shadow-sm bg-white/80 backdrop-blur-sm">
            <CardHeader>
              <CardTitle>可用性问题识别</CardTitle>
              <CardDescription>导航栏使用体验中发现的问题分类</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {navigationAnalysis.usabilityIssues.map((category, index) => (
                  <div
                    key={index}
                    className="border rounded-xl p-4 bg-sky-50/30"
                  >
                    <div className="flex items-center justify-between mb-3">
                      <h4 className="font-medium text-slate-800 flex items-center">
                        <AlertTriangle className="w-4 h-4 mr-2 text-orange-500" />
                        {category.category}
                      </h4>
                      <Badge
                        variant="outline"
                        className={`${getSeverityColor(category.severity)} border-current`}
                      >
                        {category.severity}严重度
                      </Badge>
                    </div>
                    <ul className="space-y-2">
                      {category.issues.map((issue, issueIndex) => (
                        <li
                          key={issueIndex}
                          className="text-sm text-slate-600 flex items-start"
                        >
                          <div className="w-1.5 h-1.5 bg-orange-400 rounded-full mr-2 mt-2 flex-shrink-0" />
                          {issue}
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="recommendations" className="space-y-6">
          <Card className="border-sky-200 shadow-sm bg-white/80 backdrop-blur-sm">
            <CardHeader>
              <CardTitle>优化建议</CardTitle>
              <CardDescription>基于分析结果的具体改进建议</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {navigationAnalysis.recommendations.map((rec, index) => (
                  <div
                    key={index}
                    className="border rounded-xl p-4 hover:shadow-sm transition-all duration-200"
                  >
                    <div className="flex items-center justify-between mb-3">
                      <h4 className="font-medium text-slate-800">
                        {rec.title}
                      </h4>
                      <div className="flex items-center space-x-2">
                        <Badge
                          variant="outline"
                          className={getImpactColor(rec.impact)}
                        >
                          {rec.impact}影响
                        </Badge>
                        <Badge
                          variant="outline"
                          className="bg-sky-50 text-sky-600 border-sky-200"
                        >
                          {rec.timeline}
                        </Badge>
                      </div>
                    </div>
                    <p className="text-sm text-slate-600 mb-2">
                      {rec.description}
                    </p>
                    <div className="flex items-center text-xs text-slate-500">
                      <Star className="w-3 h-3 mr-1 text-yellow-500" />
                      预期工作量: {rec.effort} • 预计时间: {rec.timeline}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* 行动计划 */}
          <Card className="border-sky-200 shadow-sm bg-white/80 backdrop-blur-sm">
            <CardHeader>
              <CardTitle>下一步行动计划</CardTitle>
              <CardDescription>基于优先级的具体实施步骤</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="p-4 bg-red-50/50 rounded-xl border border-red-200">
                  <h5 className="font-medium text-red-800 mb-2">
                    🔥 紧急优化 (本周)
                  </h5>
                  <ul className="space-y-1 text-sm text-red-700">
                    <li>• 完善客户管理模块的批量操作功能</li>
                    <li>• 实现权限管理的基础角色系统</li>
                    <li>• 修复导航栏交互反馈问题</li>
                  </ul>
                </div>

                <div className="p-4 bg-yellow-50/50 rounded-xl border border-yellow-200">
                  <h5 className="font-medium text-yellow-800 mb-2">
                    ⚡ 重要改进 (2周内)
                  </h5>
                  <ul className="space-y-1 text-sm text-yellow-700">
                    <li>• 添加面包屑导航和快捷键支持</li>
                    <li>• 优化移动端导航体验</li>
                    <li>• 完善任务管理的通知提醒功能</li>
                    <li>• 统一视觉设计规范</li>
                  </ul>
                </div>

                <div className="p-4 bg-blue-50/50 rounded-xl border border-blue-200">
                  <h5 className="font-medium text-blue-800 mb-2">
                    📈 功能扩展 (1个月内)
                  </h5>
                  <ul className="space-y-1 text-sm text-blue-700">
                    <li>• 实现财务模块的核心功能</li>
                    <li>• 开发OA审批的工作流引擎</li>
                    <li>• 完善数据分析和报表功能</li>
                    <li>• 实现通知中心的实时推送</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
