/**
 * @file training-promotion-system.tsx
 * @description training-promotion-system component/module for YYC3 Customer Care Center
 * @module components.training.training-promotion-system
 * @author YYC³ Team
 * @version 1.0.0
 * @created 2026-01-23
 * @updated 2026-01-23
 * @copyright Copyright (c) 2026 YYC³
 * @license MIT
 */

'use client';

import { useState } from 'react';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Progress } from '@/components/ui/progress';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from '@/components/ui/chart';
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  ResponsiveContainer,
  Legend,
} from 'recharts';
import {
  Megaphone,
  Users,
  Target,
  Calendar,
  Clock,
  Star,
  Gift,
  Trophy,
  Zap,
  Eye,
  Plus,
  Edit,
  BarChart3,
  Award,
} from 'lucide-react';

interface Campaign {
  id: string;
  title: string;
  description: string;
  type:
    | 'course_promotion'
    | 'skill_challenge'
    | 'learning_streak'
    | 'certification'
    | 'community_event';
  status: 'draft' | 'active' | 'paused' | 'completed';
  startDate: Date;
  endDate: Date;
  targetAudience: string[];
  goals: CampaignGoal[];
  rewards: Reward[];
  metrics: CampaignMetrics;
  createdBy: string;
}

interface CampaignGoal {
  id: string;
  description: string;
  target: number;
  current: number;
  unit: string;
}

interface Reward {
  id: string;
  type: 'badge' | 'certificate' | 'points' | 'discount' | 'gift';
  name: string;
  description: string;
  value: string;
  icon: string;
}

interface CampaignMetrics {
  participants: number;
  completionRate: number;
  engagement: number;
  satisfaction: number;
  conversions: number;
}

interface Participant {
  id: string;
  userId: string;
  userName: string;
  userAvatar?: string;
  campaignId: string;
  joinedAt: Date;
  progress: number;
  completed: boolean;
  rewards: string[];
}

export function TrainingPromotionSystem() {
  const [campaigns, setCampaigns] = useState<Campaign[]>([
    {
      id: 'campaign_1',
      title: '新年学习挑战',
      description: '新年新技能！完成指定课程获得专属徽章和证书',
      type: 'skill_challenge',
      status: 'active',
      startDate: new Date('2024-01-01'),
      endDate: new Date('2024-01-31'),
      targetAudience: ['新员工', '销售团队'],
      goals: [
        {
          id: 'goal_1',
          description: '完成课程数量',
          target: 500,
          current: 342,
          unit: '门',
        },
        {
          id: 'goal_2',
          description: '参与人数',
          target: 200,
          current: 156,
          unit: '人',
        },
      ],
      rewards: [
        {
          id: 'reward_1',
          type: 'badge',
          name: '学习达人',
          description: '完成5门课程获得',
          value: '专属徽章',
          icon: '🏆',
        },
        {
          id: 'reward_2',
          type: 'certificate',
          name: '技能认证',
          description: '通过所有考试获得',
          value: '官方证书',
          icon: '📜',
        },
      ],
      metrics: {
        participants: 156,
        completionRate: 68.4,
        engagement: 85.2,
        satisfaction: 4.6,
        conversions: 89,
      },
      createdBy: '培训部',
    },
    {
      id: 'campaign_2',
      title: '客户管理专家认证',
      description: '深入学习客户管理技能，获得专业认证',
      type: 'certification',
      status: 'active',
      startDate: new Date('2024-01-15'),
      endDate: new Date('2024-02-15'),
      targetAudience: ['销售团队', '客服团队'],
      goals: [
        {
          id: 'goal_3',
          description: '认证通过率',
          target: 80,
          current: 72,
          unit: '%',
        },
        {
          id: 'goal_4',
          description: '学习时长',
          target: 1000,
          current: 756,
          unit: '小时',
        },
      ],
      rewards: [
        {
          id: 'reward_3',
          type: 'certificate',
          name: 'CRM专家认证',
          description: '客户管理专业认证',
          value: '行业认证',
          icon: '🎖️',
        },
      ],
      metrics: {
        participants: 89,
        completionRate: 72.1,
        engagement: 91.5,
        satisfaction: 4.8,
        conversions: 64,
      },
      createdBy: '人力资源部',
    },
    {
      id: 'campaign_3',
      title: '连续学习打卡',
      description: '连续30天学习打卡，养成良好学习习惯',
      type: 'learning_streak',
      status: 'completed',
      startDate: new Date('2023-12-01'),
      endDate: new Date('2023-12-31'),
      targetAudience: ['全体员工'],
      goals: [
        {
          id: 'goal_5',
          description: '连续打卡天数',
          target: 30,
          current: 30,
          unit: '天',
        },
        {
          id: 'goal_6',
          description: '参与人数',
          target: 300,
          current: 278,
          unit: '人',
        },
      ],
      rewards: [
        {
          id: 'reward_4',
          type: 'points',
          name: '学习积分',
          description: '每日打卡获得积分',
          value: '100积分/天',
          icon: '⭐',
        },
      ],
      metrics: {
        participants: 278,
        completionRate: 85.6,
        engagement: 78.9,
        satisfaction: 4.3,
        conversions: 238,
      },
      createdBy: '培训部',
    },
  ]);

  const [participants, setParticipants] = useState<Participant[]>([
    {
      id: 'part_1',
      userId: 'user_1',
      userName: '张三',
      userAvatar: '/placeholder.svg?height=40&width=40&text=张',
      campaignId: 'campaign_1',
      joinedAt: new Date('2024-01-05'),
      progress: 80,
      completed: false,
      rewards: ['reward_1'],
    },
    {
      id: 'part_2',
      userId: 'user_2',
      userName: '李四',
      userAvatar: '/placeholder.svg?height=40&width=40&text=李',
      campaignId: 'campaign_1',
      joinedAt: new Date('2024-01-03'),
      progress: 100,
      completed: true,
      rewards: ['reward_1', 'reward_2'],
    },
    {
      id: 'part_3',
      userId: 'user_3',
      userName: '王五',
      userAvatar: '/placeholder.svg?height=40&width=40&text=王',
      campaignId: 'campaign_2',
      joinedAt: new Date('2024-01-18'),
      progress: 45,
      completed: false,
      rewards: [],
    },
  ]);

  const [newCampaign, setNewCampaign] = useState({
    title: '',
    description: '',
    type: 'course_promotion' as Campaign['type'],
    startDate: '',
    endDate: '',
    targetAudience: [] as string[],
  });

  // 活动效果数据
  const campaignEffectiveness = [
    { month: '10月', participants: 120, completions: 89, satisfaction: 4.2 },
    { month: '11月', participants: 145, completions: 112, satisfaction: 4.4 },
    { month: '12月', participants: 278, completions: 238, satisfaction: 4.3 },
    { month: '1月', participants: 245, completions: 167, satisfaction: 4.7 },
  ];

  // 活动类型分布
  const campaignTypeData = [
    { type: '技能挑战', count: 8, color: '#3b82f6' },
    { type: '认证考试', count: 5, color: '#10b981' },
    { type: '学习打卡', count: 12, color: '#f59e0b' },
    { type: '社区活动', count: 6, color: '#8b5cf6' },
    { type: '课程推广', count: 9, color: '#ef4444' },
  ];

  // 参与度分析
  const engagementData = [
    { audience: '新员工', participation: 85, completion: 72 },
    { audience: '销售团队', participation: 92, completion: 78 },
    { audience: '技术团队', participation: 76, completion: 85 },
    { audience: '管理层', participation: 68, completion: 89 },
    { audience: '客服团队', participation: 88, completion: 74 },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active':
        return 'bg-green-100 text-green-800';
      case 'draft':
        return 'bg-gray-100 text-gray-800';
      case 'paused':
        return 'bg-yellow-100 text-yellow-800';
      case 'completed':
        return 'bg-blue-100 text-blue-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusLabel = (status: string) => {
    const labels = {
      active: '进行中',
      draft: '草稿',
      paused: '已暂停',
      completed: '已完成',
    };
    return labels[status as keyof typeof labels] || status;
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'course_promotion':
        return <Megaphone className="w-4 h-4" />;
      case 'skill_challenge':
        return <Target className="w-4 h-4" />;
      case 'learning_streak':
        return <Zap className="w-4 h-4" />;
      case 'certification':
        return <Award className="w-4 h-4" />;
      case 'community_event':
        return <Users className="w-4 h-4" />;
      default:
        return <Star className="w-4 h-4" />;
    }
  };

  const getTypeLabel = (type: string) => {
    const labels = {
      course_promotion: '课程推广',
      skill_challenge: '技能挑战',
      learning_streak: '学习打卡',
      certification: '认证考试',
      community_event: '社区活动',
    };
    return labels[type as keyof typeof labels] || type;
  };

  const getRewardIcon = (type: string) => {
    switch (type) {
      case 'badge':
        return <Trophy className="w-4 h-4" />;
      case 'certificate':
        return <Award className="w-4 h-4" />;
      case 'points':
        return <Star className="w-4 h-4" />;
      case 'discount':
        return <Gift className="w-4 h-4" />;
      case 'gift':
        return <Gift className="w-4 h-4" />;
      default:
        return <Star className="w-4 h-4" />;
    }
  };

  const createCampaign = () => {
    const campaign: Campaign = {
      id: `campaign_${Date.now()}`,
      ...newCampaign,
      status: 'draft',
      startDate: new Date(newCampaign.startDate),
      endDate: new Date(newCampaign.endDate),
      goals: [],
      rewards: [],
      metrics: {
        participants: 0,
        completionRate: 0,
        engagement: 0,
        satisfaction: 0,
        conversions: 0,
      },
      createdBy: '当前用户',
    };

    setCampaigns((prev) => [campaign, ...prev]);
    setNewCampaign({
      title: '',
      description: '',
      type: 'course_promotion',
      startDate: '',
      endDate: '',
      targetAudience: [],
    });
  };

  const joinCampaign = (campaignId: string) => {
    const participant: Participant = {
      id: `part_${Date.now()}`,
      userId: 'current_user',
      userName: '当前用户',
      campaignId,
      joinedAt: new Date(),
      progress: 0,
      completed: false,
      rewards: [],
    };

    setParticipants((prev) => [participant, ...prev]);

    // 更新活动参与人数
    setCampaigns((prev) =>
      prev.map((campaign) =>
        campaign.id === campaignId
          ? {
              ...campaign,
              metrics: {
                ...campaign.metrics,
                participants: campaign.metrics.participants + 1,
              },
            }
          : campaign
      )
    );
  };

  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold flex items-center">
            <Megaphone className="w-8 h-8 mr-3 text-orange-600" />
            培训推广系统
          </h1>
          <p className="text-muted-foreground">
            创建和管理培训推广活动，提升学习参与度
          </p>
        </div>
        <div className="flex space-x-2">
          <Button variant="outline">
            <BarChart3 className="w-4 h-4 mr-2" />
            活动报告
          </Button>
          <Button>
            <Plus className="w-4 h-4 mr-2" />
            创建活动
          </Button>
        </div>
      </div>

      {/* 统计概览 */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
        <Card>
          <CardContent className="p-6 text-center">
            <Megaphone className="w-8 h-8 mx-auto mb-2 text-orange-600" />
            <p className="text-2xl font-bold">{campaigns.length}</p>
            <p className="text-sm text-gray-600">总活动数</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6 text-center">
            <Zap className="w-8 h-8 mx-auto mb-2 text-green-600" />
            <p className="text-2xl font-bold">
              {campaigns.filter((c) => c.status === 'active').length}
            </p>
            <p className="text-sm text-gray-600">进行中</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6 text-center">
            <Users className="w-8 h-8 mx-auto mb-2 text-blue-600" />
            <p className="text-2xl font-bold">{participants.length}</p>
            <p className="text-sm text-gray-600">总参与人数</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6 text-center">
            <Trophy className="w-8 h-8 mx-auto mb-2 text-purple-600" />
            <p className="text-2xl font-bold">
              {participants.filter((p) => p.completed).length}
            </p>
            <p className="text-sm text-gray-600">完成人数</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6 text-center">
            <Star className="w-8 h-8 mx-auto mb-2 text-yellow-600" />
            <p className="text-2xl font-bold">
              {campaigns.length > 0
                ? (
                    campaigns.reduce(
                      (sum, c) => sum + c.metrics.satisfaction,
                      0
                    ) / campaigns.length
                  ).toFixed(1)
                : '0'}
            </p>
            <p className="text-sm text-gray-600">平均满意度</p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="campaigns" className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="campaigns">活动管理</TabsTrigger>
          <TabsTrigger value="create">创建活动</TabsTrigger>
          <TabsTrigger value="participants">参与者</TabsTrigger>
          <TabsTrigger value="analytics">数据分析</TabsTrigger>
        </TabsList>

        <TabsContent value="campaigns" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {campaigns.map((campaign) => (
              <Card
                key={campaign.id}
                className="hover:shadow-lg transition-shadow"
              >
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div className="flex items-center space-x-2">
                      <div className="w-8 h-8 bg-orange-100 rounded-full flex items-center justify-center text-orange-600">
                        {getTypeIcon(campaign.type)}
                      </div>
                      <div>
                        <CardTitle className="text-lg">
                          {campaign.title}
                        </CardTitle>
                        <Badge variant="outline">
                          {getTypeLabel(campaign.type)}
                        </Badge>
                      </div>
                    </div>
                    <Badge className={getStatusColor(campaign.status)}>
                      {getStatusLabel(campaign.status)}
                    </Badge>
                  </div>
                  <CardDescription>{campaign.description}</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <p className="text-gray-600">开始时间</p>
                      <p className="font-medium">
                        {campaign.startDate.toLocaleDateString('zh-CN')}
                      </p>
                    </div>
                    <div>
                      <p className="text-gray-600">结束时间</p>
                      <p className="font-medium">
                        {campaign.endDate.toLocaleDateString('zh-CN')}
                      </p>
                    </div>
                    <div>
                      <p className="text-gray-600">参与人数</p>
                      <p className="font-medium">
                        {campaign.metrics.participants}
                      </p>
                    </div>
                    <div>
                      <p className="text-gray-600">完成率</p>
                      <p className="font-medium">
                        {campaign.metrics.completionRate.toFixed(1)}%
                      </p>
                    </div>
                  </div>

                  <div>
                    <p className="text-sm font-medium mb-2">目标受众</p>
                    <div className="flex flex-wrap gap-1">
                      {campaign.targetAudience.map((audience, index) => (
                        <Badge
                          key={index}
                          variant="secondary"
                          className="text-xs"
                        >
                          {audience}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  <div>
                    <p className="text-sm font-medium mb-2">活动目标</p>
                    <div className="space-y-2">
                      {campaign.goals.map((goal) => (
                        <div key={goal.id} className="space-y-1">
                          <div className="flex justify-between text-xs">
                            <span>{goal.description}</span>
                            <span>
                              {goal.current}/{goal.target} {goal.unit}
                            </span>
                          </div>
                          <Progress
                            value={(goal.current / goal.target) * 100}
                            className="h-1"
                          />
                        </div>
                      ))}
                    </div>
                  </div>

                  <div>
                    <p className="text-sm font-medium mb-2">奖励机制</p>
                    <div className="flex flex-wrap gap-2">
                      {campaign.rewards.map((reward) => (
                        <div
                          key={reward.id}
                          className="flex items-center space-x-1 text-xs bg-gray-100 px-2 py-1 rounded"
                        >
                          {getRewardIcon(reward.type)}
                          <span>{reward.name}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="flex justify-between pt-4 border-t">
                    <div className="flex space-x-2">
                      <Button variant="outline" size="sm">
                        <Eye className="w-4 h-4 mr-1" />
                        查看
                      </Button>
                      <Button variant="outline" size="sm">
                        <Edit className="w-4 h-4 mr-1" />
                        编辑
                      </Button>
                    </div>
                    {campaign.status === 'active' && (
                      <Button
                        size="sm"
                        onClick={() => joinCampaign(campaign.id)}
                      >
                        <Users className="w-4 h-4 mr-1" />
                        参与活动
                      </Button>
                    )}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="create" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>创建推广活动</CardTitle>
              <CardDescription>
                设计吸引人的培训推广活动，提升学习参与度
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <Label>活动标题</Label>
                  <Input
                    value={newCampaign.title}
                    onChange={(e) =>
                      setNewCampaign({ ...newCampaign, title: e.target.value })
                    }
                    placeholder="输入活动标题"
                  />
                </div>
                <div>
                  <Label>活动类型</Label>
                  <Select
                    value={newCampaign.type}
                    onValueChange={(value) =>
                      setNewCampaign({
                        ...newCampaign,
                        type: value as Campaign['type'],
                      })
                    }
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="course_promotion">课程推广</SelectItem>
                      <SelectItem value="skill_challenge">技能挑战</SelectItem>
                      <SelectItem value="learning_streak">学习打卡</SelectItem>
                      <SelectItem value="certification">认证考试</SelectItem>
                      <SelectItem value="community_event">社区活动</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div>
                <Label>活动描述</Label>
                <Textarea
                  value={newCampaign.description}
                  onChange={(e) =>
                    setNewCampaign({
                      ...newCampaign,
                      description: e.target.value,
                    })
                  }
                  placeholder="详细描述活动内容和规则"
                  rows={4}
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <Label>开始时间</Label>
                  <Input
                    type="date"
                    value={newCampaign.startDate}
                    onChange={(e) =>
                      setNewCampaign({
                        ...newCampaign,
                        startDate: e.target.value,
                      })
                    }
                  />
                </div>
                <div>
                  <Label>结束时间</Label>
                  <Input
                    type="date"
                    value={newCampaign.endDate}
                    onChange={(e) =>
                      setNewCampaign({
                        ...newCampaign,
                        endDate: e.target.value,
                      })
                    }
                  />
                </div>
              </div>

              <div>
                <Label>目标受众</Label>
                <div className="grid grid-cols-3 gap-2 mt-2">
                  {[
                    '新员工',
                    '销售团队',
                    '技术团队',
                    '管理层',
                    '客服团队',
                    '全体员工',
                  ].map((audience) => (
                    <label
                      key={audience}
                      className="flex items-center space-x-2"
                    >
                      <input
                        type="checkbox"
                        checked={newCampaign.targetAudience.includes(audience)}
                        onChange={(e) => {
                          if (e.target.checked) {
                            setNewCampaign({
                              ...newCampaign,
                              targetAudience: [
                                ...newCampaign.targetAudience,
                                audience,
                              ],
                            });
                          } else {
                            setNewCampaign({
                              ...newCampaign,
                              targetAudience: newCampaign.targetAudience.filter(
                                (a) => a !== audience
                              ),
                            });
                          }
                        }}
                        className="rounded"
                      />
                      <span className="text-sm">{audience}</span>
                    </label>
                  ))}
                </div>
              </div>

              <Button
                onClick={createCampaign}
                disabled={
                  !newCampaign.title ||
                  !newCampaign.description ||
                  !newCampaign.startDate ||
                  !newCampaign.endDate
                }
                className="w-full"
              >
                <Plus className="w-4 h-4 mr-2" />
                创建活动
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="participants" className="space-y-6">
          <div className="space-y-4">
            {participants.map((participant) => {
              const campaign = campaigns.find(
                (c) => c.id === participant.campaignId
              );
              return (
                <Card key={participant.id}>
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-4">
                        <Avatar>
                          <AvatarImage
                            src={participant.userAvatar || '/placeholder.svg'}
                          />
                          <AvatarFallback>
                            {participant.userName.charAt(0)}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <h3 className="font-semibold">
                            {participant.userName}
                          </h3>
                          <p className="text-sm text-gray-600">
                            {campaign?.title}
                          </p>
                          <div className="flex items-center space-x-4 text-sm text-gray-500 mt-1">
                            <span className="flex items-center">
                              <Calendar className="w-4 h-4 mr-1" />
                              {participant.joinedAt.toLocaleDateString('zh-CN')}
                            </span>
                            <span className="flex items-center">
                              <Clock className="w-4 h-4 mr-1" />
                              进度 {participant.progress}%
                            </span>
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center space-x-4">
                        <div className="text-right">
                          <Progress
                            value={participant.progress}
                            className="w-24 h-2"
                          />
                          <p className="text-xs text-gray-500 mt-1">
                            {participant.progress}% 完成
                          </p>
                        </div>
                        <div className="flex space-x-1">
                          {participant.rewards.map((rewardId, index) => (
                            <div
                              key={index}
                              className="w-6 h-6 bg-yellow-100 rounded-full flex items-center justify-center"
                            >
                              <Trophy className="w-3 h-3 text-yellow-600" />
                            </div>
                          ))}
                        </div>
                        {participant.completed && (
                          <Badge className="bg-green-100 text-green-800">
                            已完成
                          </Badge>
                        )}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </TabsContent>

        <TabsContent value="analytics" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>活动效果趋势</CardTitle>
                <CardDescription>每月活动参与和完成情况</CardDescription>
              </CardHeader>
              <CardContent>
                <ChartContainer
                  config={{
                    participants: {
                      label: '参与人数',
                      color: 'hsl(var(--chart-1))',
                    },
                    completions: {
                      label: '完成人数',
                      color: 'hsl(var(--chart-2))',
                    },
                    satisfaction: {
                      label: '满意度',
                      color: 'hsl(var(--chart-3))',
                    },
                  }}
                  className="h-[300px]"
                >
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={campaignEffectiveness}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="month" />
                      <YAxis yAxisId="left" />
                      <YAxis yAxisId="right" orientation="right" />
                      <ChartTooltip content={<ChartTooltipContent />} />
                      <Legend />
                      <Line
                        yAxisId="left"
                        type="monotone"
                        dataKey="participants"
                        stroke="var(--color-participants)"
                        strokeWidth={2}
                      />
                      <Line
                        yAxisId="left"
                        type="monotone"
                        dataKey="completions"
                        stroke="var(--color-completions)"
                        strokeWidth={2}
                      />
                      <Line
                        yAxisId="right"
                        type="monotone"
                        dataKey="satisfaction"
                        stroke="var(--color-satisfaction)"
                        strokeWidth={2}
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </ChartContainer>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>活动类型分布</CardTitle>
                <CardDescription>各类型活动的数量分布</CardDescription>
              </CardHeader>
              <CardContent>
                <ChartContainer
                  config={{
                    count: {
                      label: '数量',
                      color: 'hsl(var(--chart-4))',
                    },
                  }}
                  className="h-[300px]"
                >
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={campaignTypeData}
                        cx="50%"
                        cy="50%"
                        outerRadius={80}
                        dataKey="count"
                        label={({ type, percent }) =>
                          `${type} ${(percent * 100).toFixed(0)}%`
                        }
                      >
                        {campaignTypeData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                      <ChartTooltip content={<ChartTooltipContent />} />
                    </PieChart>
                  </ResponsiveContainer>
                </ChartContainer>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>受众参与度分析</CardTitle>
              <CardDescription>不同受众群体的参与和完成情况</CardDescription>
            </CardHeader>
            <CardContent>
              <ChartContainer
                config={{
                  participation: {
                    label: '参与率',
                    color: 'hsl(var(--chart-1))',
                  },
                  completion: {
                    label: '完成率',
                    color: 'hsl(var(--chart-2))',
                  },
                }}
                className="h-[300px]"
              >
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={engagementData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="audience" />
                    <YAxis />
                    <ChartTooltip content={<ChartTooltipContent />} />
                    <Legend />
                    <Bar
                      dataKey="participation"
                      fill="var(--color-participation)"
                    />
                    <Bar dataKey="completion" fill="var(--color-completion)" />
                  </BarChart>
                </ResponsiveContainer>
              </ChartContainer>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
