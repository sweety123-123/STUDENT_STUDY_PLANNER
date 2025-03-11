
import React from 'react';
import { Link } from 'react-router-dom';
import { 
  CalendarClock, 
  BookOpen, 
  CheckCircle, 
  Clock, 
  BarChart3,
  TrendingUp,
  AlertCircle
} from 'lucide-react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';

const Dashboard: React.FC = () => {
  const today = new Date();
  const formattedDate = today.toLocaleDateString('en-US', { 
    weekday: 'long', 
    month: 'long', 
    day: 'numeric' 
  });

  // Mock data for demonstration
  const upcomingTasks = [
    { id: 1, title: 'Math Assignment', due: 'Today, 11:59 PM', priority: 'high' },
    { id: 2, title: 'History Essay Research', due: 'Tomorrow, 3:00 PM', priority: 'medium' },
    { id: 3, title: 'Physics Lab Report', due: 'Sep 18, 11:59 PM', priority: 'medium' },
  ];

  const subjects = [
    { id: 1, name: 'Mathematics', progress: 68, icon: <BarChart3 className="h-4 w-4" /> },
    { id: 2, name: 'Physics', progress: 45, icon: <TrendingUp className="h-4 w-4" /> },
    { id: 3, name: 'History', progress: 82, icon: <BookOpen className="h-4 w-4" /> },
  ];

  const scheduleToday = [
    { id: 1, subject: 'Mathematics', time: '9:00 AM - 10:30 AM', completed: true },
    { id: 2, subject: 'Physics', time: '11:00 AM - 12:30 PM', completed: false },
    { id: 3, subject: 'History', time: '2:00 PM - 3:30 PM', completed: false },
  ];

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-2">
        <h2 className="text-2xl font-semibold tracking-tight">{formattedDate}</h2>
        <p className="text-muted-foreground">Welcome back to your study dashboard</p>
      </div>
      
      {/* Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="glass-card hover-card">
          <CardHeader className="pb-2">
            <CardTitle className="text-lg flex items-center gap-2">
              <CalendarClock className="h-5 w-5 text-primary" />
              Study Time Today
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">2.5 <span className="text-lg font-normal text-muted-foreground">hrs</span></div>
            <p className="text-sm text-muted-foreground mt-1">Goal: 4 hours</p>
            <Progress value={62.5} className="h-1.5 mt-3" />
          </CardContent>
          <CardFooter className="pt-0">
            <p className="text-xs text-muted-foreground">62.5% of daily goal completed</p>
          </CardFooter>
        </Card>

        <Card className="glass-card hover-card">
          <CardHeader className="pb-2">
            <CardTitle className="text-lg flex items-center gap-2">
              <CheckCircle className="h-5 w-5 text-primary" />
              Tasks Completed
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">3 <span className="text-lg font-normal text-muted-foreground">/ 7</span></div>
            <p className="text-sm text-muted-foreground mt-1">Today's tasks</p>
            <Progress value={42.8} className="h-1.5 mt-3" />
          </CardContent>
          <CardFooter className="pt-0">
            <p className="text-xs text-muted-foreground">42.8% of today's tasks completed</p>
          </CardFooter>
        </Card>

        <Card className="glass-card hover-card">
          <CardHeader className="pb-2">
            <CardTitle className="text-lg flex items-center gap-2">
              <BookOpen className="h-5 w-5 text-primary" />
              Study Streak
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">7 <span className="text-lg font-normal text-muted-foreground">days</span></div>
            <p className="text-sm text-muted-foreground mt-1">Keep it going!</p>
            <div className="flex gap-1 mt-3">
              {Array(7).fill(0).map((_, i) => (
                <div 
                  key={i} 
                  className="h-1.5 flex-1 rounded-full bg-primary" 
                />
              ))}
              {Array(3).fill(0).map((_, i) => (
                <div 
                  key={i} 
                  className="h-1.5 flex-1 rounded-full bg-muted" 
                />
              ))}
            </div>
          </CardContent>
          <CardFooter className="pt-0">
            <p className="text-xs text-muted-foreground">You're on your longest streak yet!</p>
          </CardFooter>
        </Card>
      </div>

      {/* Main Content */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Upcoming Tasks */}
        <Card className="glass-card lg:col-span-2">
          <CardHeader>
            <div className="flex justify-between items-center">
              <CardTitle>Upcoming Tasks</CardTitle>
              <Link to="/tasks">
                <Button variant="ghost" size="sm">View All</Button>
              </Link>
            </div>
            <CardDescription>Tasks due soon</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {upcomingTasks.map(task => (
                <div key={task.id} className="flex items-start gap-4 p-3 bg-card/50 rounded-lg border border-border/50">
                  <div className={`rounded-full p-1.5 ${
                    task.priority === 'high' 
                      ? 'bg-destructive/10 text-destructive' 
                      : 'bg-primary/10 text-primary'
                  }`}>
                    {task.priority === 'high' ? (
                      <AlertCircle className="h-4 w-4" />
                    ) : (
                      <Clock className="h-4 w-4" />
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <h4 className="font-medium text-sm">{task.title}</h4>
                    <p className="text-xs text-muted-foreground mt-1">Due: {task.due}</p>
                  </div>
                  <Button variant="outline" size="sm">Complete</Button>
                </div>
              ))}
            </div>
          </CardContent>
          <CardFooter>
            <Button className="w-full">Add New Task</Button>
          </CardFooter>
        </Card>

        {/* Today's Schedule */}
        <Card className="glass-card">
          <CardHeader>
            <CardTitle>Today's Schedule</CardTitle>
            <CardDescription>Your study plan for today</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {scheduleToday.map(item => (
                <div key={item.id} className="relative">
                  <div className="flex items-center gap-3">
                    <div className={`h-3 w-3 rounded-full ${
                      item.completed ? 'bg-primary' : 'bg-muted'
                    }`} />
                    <div className={`flex-1 p-3 rounded-lg border ${
                      item.completed 
                        ? 'border-primary/20 bg-primary/5' 
                        : 'border-border bg-card/50'
                    }`}>
                      <h4 className="font-medium text-sm">{item.subject}</h4>
                      <p className="text-xs text-muted-foreground mt-1">{item.time}</p>
                    </div>
                  </div>
                  {item.id !== scheduleToday.length && (
                    <div className="absolute left-1.5 top-3 bottom-0 w-0.5 bg-muted" />
                  )}
                </div>
              ))}
            </div>
          </CardContent>
          <CardFooter>
            <Button variant="outline" className="w-full">View Full Schedule</Button>
          </CardFooter>
        </Card>
      </div>

      {/* Subject Progress */}
      <Card className="glass-card">
        <CardHeader>
          <div className="flex justify-between items-center">
            <CardTitle>Subject Progress</CardTitle>
            <Link to="/subjects">
              <Button variant="ghost" size="sm">View All</Button>
            </Link>
          </div>
          <CardDescription>Track your progress across subjects</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {subjects.map(subject => (
              <div key={subject.id} className="p-4 rounded-lg border border-border/50 bg-card/50">
                <div className="flex items-center justify-between mb-3">
                  <h4 className="font-medium">{subject.name}</h4>
                  <div className="bg-primary/10 rounded-full p-1.5 text-primary">
                    {subject.icon}
                  </div>
                </div>
                <Progress value={subject.progress} className="h-1.5" />
                <p className="text-xs text-muted-foreground mt-2">{subject.progress}% completed</p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Dashboard;
