import React, { useState } from 'react';
import { 
  CheckCircle2, 
  Circle, 
  FilterX, 
  Plus, 
  Search,
  Clock,
  AlertCircle,
  Calendar as CalendarIcon,
  ChevronDown,
  Trash2
} from 'lucide-react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import TaskForm from '@/components/forms/TaskForm';

// Mock task type
interface Task {
  id: number;
  title: string;
  description?: string;
  dueDate: string;
  subject: string;
  priority: 'high' | 'medium' | 'low';
  completed: boolean;
}

const TaskList: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [isTaskDialogOpen, setIsTaskDialogOpen] = useState(false);
  
  // Mock data for demonstration
  const tasks: Task[] = [
    {
      id: 1,
      title: 'Complete Math Assignment',
      description: 'Problems 1-10 from Chapter 5',
      dueDate: 'Today, 11:59 PM',
      subject: 'Mathematics',
      priority: 'high',
      completed: false
    },
    {
      id: 2,
      title: 'History Essay Research',
      description: 'Find sources for the Renaissance essay',
      dueDate: 'Tomorrow, 3:00 PM',
      subject: 'History',
      priority: 'medium',
      completed: false
    },
    {
      id: 3,
      title: 'Physics Lab Report',
      description: 'Write up the results from the pendulum experiment',
      dueDate: 'Sep 18, 11:59 PM',
      subject: 'Physics',
      priority: 'medium',
      completed: false
    },
    {
      id: 4,
      title: 'Review Chemistry Notes',
      description: 'Review chapters 1-3 for the upcoming quiz',
      dueDate: 'Sep 15, 9:00 AM',
      subject: 'Chemistry',
      priority: 'low',
      completed: true
    },
    {
      id: 5,
      title: 'English Literature Reading',
      description: 'Read chapters 4-6 of To Kill a Mockingbird',
      dueDate: 'Sep 14, 11:59 PM',
      subject: 'English',
      priority: 'medium',
      completed: true
    },
  ];

  const handleAddTask = (data: any) => {
    console.log('New task data:', data);
    setIsTaskDialogOpen(false);
    // In a real application, you would add the task to your state or database
  };

  const filteredTasks = tasks.filter(task => 
    task.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    (task.description && task.description.toLowerCase().includes(searchQuery.toLowerCase())) ||
    task.subject.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const pendingTasks = filteredTasks.filter(task => !task.completed);
  const completedTasks = filteredTasks.filter(task => task.completed);
  
  const totalTasks = tasks.length;
  const completedTasksCount = tasks.filter(task => task.completed).length;
  const completionPercentage = totalTasks > 0 ? (completedTasksCount / totalTasks) * 100 : 0;

  const renderTaskItem = (task: Task) => (
    <div key={task.id} className="flex items-start gap-4 p-4 bg-card/50 rounded-lg border border-border/50 hover-card group">
      <button 
        className={`mt-0.5 rounded-full flex-shrink-0 ${
          task.completed 
            ? 'text-primary'
            : 'text-muted-foreground hover:text-primary'
        }`}
      >
        {task.completed ? (
          <CheckCircle2 className="h-5 w-5" />
        ) : (
          <Circle className="h-5 w-5" />
        )}
      </button>
      <div className="flex-1 min-w-0">
        <h4 className={`font-medium ${task.completed ? 'line-through text-muted-foreground' : ''}`}>
          {task.title}
        </h4>
        {task.description && (
          <p className={`text-sm mt-1 ${task.completed ? 'line-through text-muted-foreground' : 'text-muted-foreground'}`}>
            {task.description}
          </p>
        )}
        <div className="flex flex-wrap gap-2 mt-3">
          <div className="inline-flex items-center gap-1 rounded-full px-2.5 py-0.5 text-xs bg-secondary/50 text-secondary-foreground">
            <CalendarIcon className="h-3 w-3" />
            {task.dueDate}
          </div>
          <div className="inline-flex items-center gap-1 rounded-full px-2.5 py-0.5 text-xs bg-accent/50 text-accent-foreground">
            {task.subject}
          </div>
          <div className={`inline-flex items-center gap-1 rounded-full px-2.5 py-0.5 text-xs ${
            task.priority === 'high' 
              ? 'bg-destructive/10 text-destructive' 
              : task.priority === 'medium'
                ? 'bg-amber-500/10 text-amber-600' 
                : 'bg-primary/10 text-primary'
          }`}>
            {task.priority === 'high' ? (
              <AlertCircle className="h-3 w-3" />
            ) : task.priority === 'medium' ? (
              <Clock className="h-3 w-3" />
            ) : (
              <CheckCircle2 className="h-3 w-3" />
            )}
            {task.priority.charAt(0).toUpperCase() + task.priority.slice(1)} Priority
          </div>
        </div>
      </div>
      <div className="opacity-0 group-hover:opacity-100 transition-opacity">
        <Button variant="ghost" size="icon">
          <Trash2 className="h-4 w-4 text-muted-foreground hover:text-destructive" />
        </Button>
      </div>
    </div>
  );

  // Mock subjects data
  const subjects = [
    { id: 1, name: 'Mathematics' },
    { id: 2, name: 'Physics' },
    { id: 3, name: 'History' },
    { id: 4, name: 'Chemistry' },
    { id: 5, name: 'English Literature' },
  ];

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-2">
        <h2 className="text-2xl font-semibold tracking-tight">Tasks</h2>
        <p className="text-muted-foreground">Manage your assignments and study tasks</p>
      </div>
      
      {/* Task Overview */}
      <Card className="glass-card">
        <CardHeader className="pb-2">
          <CardTitle>Task Progress</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex justify-between items-end mb-2">
            <p className="text-sm text-muted-foreground">Overall completion</p>
            <p className="text-sm font-medium">{completedTasksCount} of {totalTasks} tasks</p>
          </div>
          <Progress value={completionPercentage} className="h-2" />

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-6">
            <div className="p-3 rounded-lg bg-card/50 border border-border/50">
              <div className="text-sm font-medium text-muted-foreground">Total Tasks</div>
              <div className="text-2xl font-bold mt-1">{totalTasks}</div>
            </div>
            <div className="p-3 rounded-lg bg-card/50 border border-border/50">
              <div className="text-sm font-medium text-muted-foreground">Pending</div>
              <div className="text-2xl font-bold mt-1">{pendingTasks.length}</div>
            </div>
            <div className="p-3 rounded-lg bg-card/50 border border-border/50">
              <div className="text-sm font-medium text-muted-foreground">Completed</div>
              <div className="text-2xl font-bold mt-1">{completedTasks.length}</div>
            </div>
          </div>
        </CardContent>
      </Card>
      
      {/* Task List */}
      <Card className="glass-card">
        <CardHeader>
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <CardTitle>Task List</CardTitle>
            <Button className="gap-1" onClick={() => setIsTaskDialogOpen(true)}>
              <Plus className="h-4 w-4" />
              Add New Task
            </Button>
          </div>
          <CardDescription>View and manage your tasks</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col md:flex-row gap-4 mb-6">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input 
                placeholder="Search tasks..." 
                className="pl-9"
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
              />
            </div>
            <div className="flex gap-2">
              <Button variant="outline" className="gap-1">
                Sort By
                <ChevronDown className="h-4 w-4" />
              </Button>
              <Button variant="ghost" className="gap-1" onClick={() => setSearchQuery('')}>
                <FilterX className="h-4 w-4" />
                Clear
              </Button>
            </div>
          </div>

          <Tabs defaultValue="all">
            <TabsList className="mb-6">
              <TabsTrigger value="all">All</TabsTrigger>
              <TabsTrigger value="pending">Pending</TabsTrigger>
              <TabsTrigger value="completed">Completed</TabsTrigger>
            </TabsList>

            <TabsContent value="all" className="space-y-4">
              {filteredTasks.length > 0 ? (
                filteredTasks.map(renderTaskItem)
              ) : (
                <div className="text-center py-12">
                  <p className="text-muted-foreground">No tasks found</p>
                  <Button 
                    variant="outline" 
                    size="sm" 
                    className="mt-4"
                    onClick={() => setIsTaskDialogOpen(true)}
                  >
                    <Plus className="h-4 w-4 mr-1" />
                    Add Task
                  </Button>
                </div>
              )}
            </TabsContent>

            <TabsContent value="pending" className="space-y-4">
              {pendingTasks.length > 0 ? (
                pendingTasks.map(renderTaskItem)
              ) : (
                <div className="text-center py-12">
                  <p className="text-muted-foreground">No pending tasks found</p>
                  <Button 
                    variant="outline" 
                    size="sm" 
                    className="mt-4"
                    onClick={() => setIsTaskDialogOpen(true)}
                  >
                    <Plus className="h-4 w-4 mr-1" />
                    Add Task
                  </Button>
                </div>
              )}
            </TabsContent>

            <TabsContent value="completed" className="space-y-4">
              {completedTasks.length > 0 ? (
                completedTasks.map(renderTaskItem)
              ) : (
                <div className="text-center py-12">
                  <p className="text-muted-foreground">No completed tasks found</p>
                </div>
              )}
            </TabsContent>
          </Tabs>
        </CardContent>
        <CardFooter>
          <p className="text-xs text-muted-foreground">Showing {filteredTasks.length} of {tasks.length} tasks</p>
        </CardFooter>
      </Card>

      {/* Task Form Dialog */}
      <Dialog open={isTaskDialogOpen} onOpenChange={setIsTaskDialogOpen}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>Add New Task</DialogTitle>
          </DialogHeader>
          <TaskForm 
            onSubmit={handleAddTask}
            onCancel={() => setIsTaskDialogOpen(false)}
            subjects={subjects}  // Added the missing subjects prop
          />
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default TaskList;
