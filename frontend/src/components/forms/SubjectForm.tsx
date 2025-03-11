
import React from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { Layers, PieChart, BarChart, BookOpen, Pencil } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { toast } from '@/hooks/use-toast';

const formSchema = z.object({
  name: z.string().min(2, { message: 'Name must be at least 2 characters.' }),
  totalHours: z.string().transform((val) => parseInt(val)),
  icon: z.enum(['PieChart', 'BarChart', 'BookOpen', 'Pencil', 'Layers']),
  color: z.enum(['blue', 'purple', 'amber', 'green', 'pink', 'red', 'indigo']),
});

type FormValues = z.infer<typeof formSchema>;

interface SubjectFormProps {
  onSubmit: (data: FormValues) => void;
  onCancel: () => void;
  defaultValues?: Partial<FormValues>;
}

const SubjectForm: React.FC<SubjectFormProps> = ({
  onSubmit,
  onCancel,
  defaultValues = {
    totalHours: 30,  // Changed from string to number
    icon: 'PieChart',
    color: 'blue',
  },
}) => {
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues,
  });

  const handleSubmit = (data: FormValues) => {
    try {
      onSubmit(data);
      toast({
        title: "Subject created",
        description: "Your subject has been successfully added to your list.",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "There was a problem creating your subject.",
        variant: "destructive",
      });
    }
  };

  // Map of icon names to components for preview
  const iconMap = {
    PieChart: <PieChart className="h-5 w-5" />,
    BarChart: <BarChart className="h-5 w-5" />,
    BookOpen: <BookOpen className="h-5 w-5" />,
    Pencil: <Pencil className="h-5 w-5" />,
    Layers: <Layers className="h-5 w-5" />,
  };

  // Get the current icon and color for preview
  const currentIcon = form.watch('icon') || 'PieChart';
  const currentColor = form.watch('color') || 'blue';

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Subject Name</FormLabel>
              <FormControl>
                <Input placeholder="Enter subject name" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="totalHours"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Total Study Hours</FormLabel>
              <FormControl>
                <Input 
                  type="number" 
                  min="1"
                  placeholder="Enter total study hours" 
                  {...field} 
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="grid grid-cols-2 gap-4">
          <FormField
            control={form.control}
            name="icon"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Icon</FormLabel>
                <Select 
                  onValueChange={field.onChange} 
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select an icon" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="PieChart">Pie Chart</SelectItem>
                    <SelectItem value="BarChart">Bar Chart</SelectItem>
                    <SelectItem value="BookOpen">Book</SelectItem>
                    <SelectItem value="Pencil">Pencil</SelectItem>
                    <SelectItem value="Layers">Layers</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="color"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Color</FormLabel>
                <Select 
                  onValueChange={field.onChange} 
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select a color" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="blue">Blue</SelectItem>
                    <SelectItem value="purple">Purple</SelectItem>
                    <SelectItem value="amber">Amber</SelectItem>
                    <SelectItem value="green">Green</SelectItem>
                    <SelectItem value="pink">Pink</SelectItem>
                    <SelectItem value="red">Red</SelectItem>
                    <SelectItem value="indigo">Indigo</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        {/* Preview */}
        <div className="mt-6 border rounded-md p-4">
          <p className="text-sm font-medium mb-2">Preview</p>
          <div className="flex items-center gap-3">
            <div className={`bg-${currentColor}-500/10 p-2 rounded-full text-${currentColor}-500`}>
              {iconMap[currentIcon as keyof typeof iconMap]}
            </div>
            <div className="font-medium">
              {form.watch('name') || 'Subject Name'}
            </div>
            <div className={`ml-auto h-3 w-12 rounded-full bg-${currentColor}-500`}></div>
          </div>
        </div>

        <div className="flex justify-end gap-2 pt-4">
          <Button variant="outline" type="button" onClick={onCancel}>
            Cancel
          </Button>
          <Button type="submit">
            Add Subject
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default SubjectForm;
