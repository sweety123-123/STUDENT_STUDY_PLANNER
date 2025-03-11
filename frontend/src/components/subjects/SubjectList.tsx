
import React, { useState } from 'react';
import { 
  PieChart, 
  BarChart, 
  Plus, 
  BookOpen, 
  Pencil, 
  Clock, 
  CalendarDays,
  Layers,
  Settings,
  Trash2
} from 'lucide-react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import SubjectForm from '@/components/forms/SubjectForm';

// Mock subject type
interface Subject {
  id: number;
  name: string;
  progress: number;
  totalHours: number;
  completedHours: number;
  tasksCount: number;
  completedTasks: number;
  color: string;
  icon: React.ReactNode;
}

const SubjectList: React.FC = () => {
  const [isSubjectDialogOpen, setIsSubjectDialogOpen] = useState(false);

  // Mock data for demonstration
  const subjects: Subject[] = [
    {
      id: 1,
      name: 'Mathematics',
      progress: 68,
      totalHours: 40,
      completedHours: 27.2,
      tasksCount: 12,
      completedTasks: 8,
      color: 'bg-blue-500',
      icon: <PieChart className="h-5 w-5" />
    },
    {
      id: 2,
      name: 'Physics',
      progress: 45,
      totalHours: 35,
      completedHours: 15.75,
      tasksCount: 10,
      completedTasks: 4,
      color: 'bg-purple-500',
      icon: <BarChart className="h-5 w-5" />
    },
    {
      id: 3,
      name: 'History',
      progress: 82,
      totalHours: 30,
      completedHours: 24.6,
      tasksCount: 8,
      completedTasks: 7,
      color: 'bg-amber-500',
      icon: <BookOpen className="h-5 w-5" />
    },
    {
      id: 4,
      name: 'Chemistry',
      progress: 54,
      totalHours: 38,
      completedHours: 20.52,
      tasksCount: 14,
      completedTasks: 8,
      color: 'bg-green-500',
      icon: <Layers className="h-5 w-5" />
    },
    {
      id: 5,
      name: 'English Literature',
      progress: 75,
      totalHours: 25,
      completedHours: 18.75,
      tasksCount: 6,
      completedTasks: 5,
      color: 'bg-pink-500',
      icon: <Pencil className="h-5 w-5" />
    },
  ];

  const handleAddSubject = (data: any) => {
    console.log('New subject data:', data);
    setIsSubjectDialogOpen(false);
    // In a real application, you would add the subject to your state or database
  };

  // Calculate overall progress
  const totalCompletedHours = subjects.reduce((sum, subject) => sum + subject.completedHours, 0);
  const totalHours = subjects.reduce((sum, subject) => sum + subject.totalHours, 0);
  const overallProgress = (totalCompletedHours / totalHours) * 100;

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-2">
        <h2 className="text-2xl font-semibold tracking-tight">Subjects</h2>
        <p className="text-muted-foreground">Track progress across your subjects</p>
      </div>
      
      {/* Subject Overview */}
      <Card className="glass-card">
        <CardHeader className="pb-2">
          <div className="flex justify-between items-center">
            <CardTitle>Overall Progress</CardTitle>
            <Button className="gap-1" onClick={() => setIsSubjectDialogOpen(true)}>
              <Plus className="h-4 w-4" />
              Add Subject
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col md:flex-row gap-6">
            <div className="flex-1">
              <div className="flex justify-between items-end mb-2">
                <p className="text-sm text-muted-foreground">Completion across all subjects</p>
                <p className="text-sm font-medium">{totalCompletedHours.toFixed(1)} of {totalHours} hours</p>
              </div>
              <Progress value={overallProgress} className="h-2" />
              
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-6">
                <div className="p-3 rounded-lg bg-card/50 border border-border/50">
                  <div className="text-sm font-medium text-muted-foreground">Subjects</div>
                  <div className="text-2xl font-bold mt-1">{subjects.length}</div>
                </div>
                <div className="p-3 rounded-lg bg-card/50 border border-border/50">
                  <div className="text-sm font-medium text-muted-foreground">Hours</div>
                  <div className="text-2xl font-bold mt-1">{totalHours}</div>
                </div>
                <div className="p-3 rounded-lg bg-card/50 border border-border/50">
                  <div className="text-sm font-medium text-muted-foreground">Hours Left</div>
                  <div className="text-2xl font-bold mt-1">{(totalHours - totalCompletedHours).toFixed(1)}</div>
                </div>
                <div className="p-3 rounded-lg bg-card/50 border border-border/50">
                  <div className="text-sm font-medium text-muted-foreground">Completion</div>
                  <div className="text-2xl font-bold mt-1">{overallProgress.toFixed(1)}%</div>
                </div>
              </div>
            </div>
            
            <div className="md:w-1/3 flex flex-col">
              <h4 className="text-sm font-medium mb-3">Hours by Subject</h4>
              <div className="flex-1 space-y-2">
                {subjects.map(subject => (
                  <div key={subject.id} className="flex items-center gap-2">
                    <div className={`h-3 w-3 rounded-full ${subject.color}`} />
                    <span className="text-sm">{subject.name}</span>
                    <span className="text-xs text-muted-foreground ml-auto">{subject.completedHours} hrs</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
      
      {/* Subject List */}
      <Card className="glass-card">
        <CardHeader>
          <CardTitle>Subject Details</CardTitle>
          <CardDescription>Track your progress in each subject</CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="grid">
            <div className="flex justify-between items-center mb-6">
              <TabsList>
                <TabsTrigger value="grid">Grid</TabsTrigger>
                <TabsTrigger value="list">List</TabsTrigger>
              </TabsList>
              <Button variant="outline" size="sm" className="gap-1">
                <Settings className="h-4 w-4" />
                Configure
              </Button>
            </div>

            <TabsContent value="grid" className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
              {subjects.map(subject => (
                <Card key={subject.id} className="hover-card border-t-4" style={{ borderTopColor: subject.color.replace('bg-', '') }}>
                  <CardHeader className="pb-2">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <div className={`${subject.color.replace('bg-', 'bg-')}/10 p-1.5 rounded-full text-${subject.color.replace('bg-', '')}`}>
                          {subject.icon}
                        </div>
                        <CardTitle className="text-lg">{subject.name}</CardTitle>
                      </div>
                      <Button variant="ghost" size="icon">
                        <Settings className="h-4 w-4" />
                      </Button>
                    </div>
                  </CardHeader>
                  <CardContent className="pb-2">
                    <div className="space-y-4">
                      <div>
                        <div className="flex justify-between text-sm mb-1">
                          <span className="text-muted-foreground">Overall Progress</span>
                          <span className="font-medium">{subject.progress}%</span>
                        </div>
                        <Progress value={subject.progress} className="h-1.5" />
                      </div>
                      
                      <div className="grid grid-cols-2 gap-2">
                        <div className="p-2 rounded-md bg-card/50">
                          <div className="flex items-center gap-1 text-xs text-muted-foreground mb-1">
                            <Clock className="h-3 w-3" />
                            Study Hours
                          </div>
                          <p className="font-medium">{subject.completedHours} <span className="text-xs text-muted-foreground">/ {subject.totalHours} hrs</span></p>
                        </div>
                        <div className="p-2 rounded-md bg-card/50">
                          <div className="flex items-center gap-1 text-xs text-muted-foreground mb-1">
                            <CalendarDays className="h-3 w-3" />
                            Tasks
                          </div>
                          <p className="font-medium">{subject.completedTasks} <span className="text-xs text-muted-foreground">/ {subject.tasksCount}</span></p>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Button variant="outline" size="sm" className="w-full">View Subject</Button>
                  </CardFooter>
                </Card>
              ))}
              <Card className="border-dashed border-2 hover-card flex flex-col items-center justify-center p-6">
                <div className="rounded-full bg-muted p-3 mb-3">
                  <Plus className="h-6 w-6 text-muted-foreground" />
                </div>
                <p className="text-muted-foreground mb-4">Add a new subject</p>
                <Button variant="outline" onClick={() => setIsSubjectDialogOpen(true)}>Add Subject</Button>
              </Card>
            </TabsContent>

            <TabsContent value="list" className="space-y-4">
              {subjects.map(subject => (
                <div key={subject.id} className="flex items-center gap-4 p-4 bg-card/50 rounded-lg border border-border/50 hover-card group">
                  <div className={`${subject.color.replace('bg-', 'bg-')}/10 p-2 rounded-full text-${subject.color.replace('bg-', '')}`}>
                    {subject.icon}
                  </div>
                  <div className="flex-1 min-w-0">
                    <h4 className="font-medium">{subject.name}</h4>
                    <div className="mt-2">
                      <div className="flex justify-between text-sm mb-1">
                        <span className="text-muted-foreground">Progress</span>
                        <span className="font-medium">{subject.progress}%</span>
                      </div>
                      <Progress value={subject.progress} className="h-1.5" />
                    </div>
                  </div>
                  <div className="flex items-center gap-6">
                    <div className="text-center">
                      <p className="text-sm font-medium">{subject.completedHours} <span className="text-xs text-muted-foreground">/ {subject.totalHours}</span></p>
                      <p className="text-xs text-muted-foreground">Hours</p>
                    </div>
                    <div className="text-center">
                      <p className="text-sm font-medium">{subject.completedTasks} <span className="text-xs text-muted-foreground">/ {subject.tasksCount}</span></p>
                      <p className="text-xs text-muted-foreground">Tasks</p>
                    </div>
                    <div className="flex gap-1">
                      <Button variant="ghost" size="icon">
                        <Pencil className="h-4 w-4 text-muted-foreground" />
                      </Button>
                      <Button variant="ghost" size="icon">
                        <Trash2 className="h-4 w-4 text-muted-foreground hover:text-destructive" />
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>

      {/* Subject Form Dialog */}
      <Dialog open={isSubjectDialogOpen} onOpenChange={setIsSubjectDialogOpen}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>Add New Subject</DialogTitle>
          </DialogHeader>
          <SubjectForm 
            onSubmit={handleAddSubject}
            onCancel={() => setIsSubjectDialogOpen(false)}
          />
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default SubjectList;
