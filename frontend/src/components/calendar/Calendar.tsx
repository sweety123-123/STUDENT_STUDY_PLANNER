
import React, { useState } from 'react';
import { Calendar as CalendarIcon, Clock, Plus } from 'lucide-react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Calendar as CalendarComponent } from '@/components/ui/calendar';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import EventForm from '@/components/forms/EventForm';

const Calendar: React.FC = () => {
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date());
  const [isEventDialogOpen, setIsEventDialogOpen] = useState(false);

  // Mock data for demonstration
  const events = [
    { 
      id: 1, 
      title: 'Math Study Session', 
      time: '9:00 AM - 10:30 AM', 
      subject: 'Mathematics',
      color: 'bg-blue-500' 
    },
    { 
      id: 2, 
      title: 'Physics Problem Set', 
      time: '11:00 AM - 12:30 PM', 
      subject: 'Physics',
      color: 'bg-purple-500' 
    },
    { 
      id: 3, 
      title: 'History Essay Writing', 
      time: '2:00 PM - 3:30 PM', 
      subject: 'History',
      color: 'bg-amber-500' 
    },
    { 
      id: 4, 
      title: 'Chemistry Lab Review', 
      time: '4:00 PM - 5:00 PM', 
      subject: 'Chemistry',
      color: 'bg-green-500' 
    },
  ];

  // Mock subjects data
  const subjects = [
    { id: 1, name: 'Mathematics' },
    { id: 2, name: 'Physics' },
    { id: 3, name: 'History' },
    { id: 4, name: 'Chemistry' },
    { id: 5, name: 'English Literature' },
  ];

  const handleAddEvent = (data: any) => {
    console.log('New event data:', data);
    setIsEventDialogOpen(false);
    // In a real application, you would add the event to your state or database
  };

  const formatDate = (date: Date | undefined) => {
    if (!date) return '';
    return date.toLocaleDateString('en-US', { 
      weekday: 'long', 
      month: 'long', 
      day: 'numeric' 
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-2">
        <h2 className="text-2xl font-semibold tracking-tight">Study Calendar</h2>
        <p className="text-muted-foreground">Manage your study schedule and events</p>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Calendar */}
        <Card className="glass-card">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <CalendarIcon className="h-5 w-5 text-primary" />
              Calendar
            </CardTitle>
            <CardDescription>Select a date to view events</CardDescription>
          </CardHeader>
          <CardContent>
            <CalendarComponent
              mode="single"
              selected={selectedDate}
              onSelect={setSelectedDate}
              className="rounded-md border"
            />
          </CardContent>
          <CardFooter>
            <Button variant="outline" className="w-full">
              Today
            </Button>
          </CardFooter>
        </Card>

        {/* Events for selected date */}
        <Card className="glass-card lg:col-span-2">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle>{formatDate(selectedDate)}</CardTitle>
                <CardDescription>Your scheduled study sessions</CardDescription>
              </div>
              <Button size="sm" className="gap-1" onClick={() => setIsEventDialogOpen(true)}>
                <Plus className="h-4 w-4" />
                Add Event
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {events.length > 0 ? (
                events.map(event => (
                  <div key={event.id} className="flex items-start gap-4 p-4 bg-card/50 rounded-lg border border-border/50 hover-card">
                    <div className={`h-full w-1 rounded-full ${event.color}`} />
                    <div className="flex-1 min-w-0">
                      <h4 className="font-medium">{event.title}</h4>
                      <div className="flex items-center gap-2 mt-1">
                        <Clock className="h-3.5 w-3.5 text-muted-foreground" />
                        <p className="text-sm text-muted-foreground">{event.time}</p>
                      </div>
                      <div className="mt-2">
                        <span className="inline-flex items-center rounded-full px-2 py-1 text-xs font-medium bg-primary/10 text-primary">
                          {event.subject}
                        </span>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm">Edit</Button>
                      <Button variant="ghost" size="sm">Cancel</Button>
                    </div>
                  </div>
                ))
              ) : (
                <div className="text-center py-12">
                  <p className="text-muted-foreground">No events scheduled for this day</p>
                  <Button 
                    variant="outline" 
                    size="sm" 
                    className="mt-4"
                    onClick={() => setIsEventDialogOpen(true)}
                  >
                    <Plus className="h-4 w-4 mr-1" />
                    Add Event
                  </Button>
                </div>
              )}
            </div>
          </CardContent>
          <CardFooter className="flex-col gap-4">
            <div className="w-full border-t border-border/50 pt-4">
              <h4 className="font-medium mb-2">Schedule at a glance</h4>
              <div className="relative h-6 w-full bg-muted rounded-full overflow-hidden">
                {[
                  { left: '10%', width: '15%', color: 'bg-blue-500' },
                  { left: '30%', width: '15%', color: 'bg-purple-500' },
                  { left: '50%', width: '15%', color: 'bg-amber-500' },
                  { left: '70%', width: '10%', color: 'bg-green-500' },
                ].map((block, index) => (
                  <div
                    key={index}
                    className={`absolute top-0 bottom-0 ${block.color}`}
                    style={{ left: block.left, width: block.width }}
                  />
                ))}
              </div>
              <div className="flex justify-between text-xs text-muted-foreground mt-1">
                <span>8 AM</span>
                <span>12 PM</span>
                <span>4 PM</span>
                <span>8 PM</span>
              </div>
            </div>
          </CardFooter>
        </Card>
      </div>

      {/* Weekly Overview */}
      <Card className="glass-card">
        <CardHeader>
          <CardTitle>Weekly Study Overview</CardTitle>
          <CardDescription>Your study plan for the week</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-7 gap-2">
            {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map((day, index) => (
              <div key={day} className="text-center">
                <div className="font-medium text-sm mb-2">{day}</div>
                <div 
                  className={`aspect-square rounded-md flex items-center justify-center border ${
                    index === 2 ? 'bg-primary text-primary-foreground border-primary' : 'border-border'
                  }`}
                >
                  <span className="text-sm">{index + 15}</span>
                </div>
                <div className="mt-2 space-y-1">
                  {index < 5 && (
                    <>
                      <div className="h-1.5 rounded-full bg-blue-500" />
                      <div className="h-1.5 rounded-full bg-purple-500" />
                      {index % 2 === 0 && <div className="h-1.5 rounded-full bg-amber-500" />}
                    </>
                  )}
                  {index === 5 && <div className="h-1.5 rounded-full bg-green-500" />}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Event Form Dialog */}
      <Dialog open={isEventDialogOpen} onOpenChange={setIsEventDialogOpen}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>Add New Study Event</DialogTitle>
          </DialogHeader>
          <EventForm 
            onSubmit={handleAddEvent}
            onCancel={() => setIsEventDialogOpen(false)}
            defaultValues={{
              date: selectedDate,
              startTime: '09:00',
              endTime: '10:30',
            }}
            subjects={subjects}  // Added the missing subjects prop
          />
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Calendar;
