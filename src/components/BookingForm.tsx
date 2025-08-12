"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"
import { useRouter, useSearchParams } from "next/navigation"
import { useEffect, useState } from "react"
import { format } from "date-fns"
import { Calendar as CalendarIcon, Users } from "lucide-react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Card, CardContent } from "@/components/ui/card"
import { Form, FormControl, FormField, FormItem, FormLabel } from "@/components/ui/form"
import { Skeleton } from "./ui/skeleton"

const formSchema = z.object({
  checkIn: z.date().optional(),
  checkOut: z.date().optional(),
  guests: z.string().optional(),
});

interface BookingFormProps {
  isPopover?: boolean;
}

export function BookingForm({ isPopover = false }: BookingFormProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      guests: "2",
      checkIn: undefined,
      checkOut: undefined,
    }
  });

  useEffect(() => {
    if (isClient) {
      const checkInParam = searchParams.get('checkIn');
      const checkOutParam = searchParams.get('checkOut');
      const guestsParam = searchParams.get('guests');

      const checkInDate = checkInParam ? new Date(`${checkInParam}T00:00:00`) : undefined;
      const checkOutDate = checkOutParam ? new Date(`${checkOutParam}T00:00:00`) : undefined;

      form.reset({
        guests: guestsParam || "2",
        checkIn: checkInDate,
        checkOut: checkOutDate,
      })
    }
  }, [isClient, searchParams, form]);

  function onSubmit(values: z.infer<typeof formSchema>) {
    const params = new URLSearchParams();
    if (values.checkIn) params.append("checkIn", format(values.checkIn, 'yyyy-MM-dd'));
    if (values.checkOut) params.append("checkOut", format(values.checkOut, 'yyyy-MM-dd'));
    if (values.guests) params.append("guests", values.guests);

    router.push(`/rooms/search?${params.toString()}`);
  }
  
  const checkInDate = form.watch("checkIn");

  if (!isClient) {
    const SkeletonLoader = (
        <div className={cn(
            "grid items-end gap-4",
            isPopover ? "grid-cols-1" : "grid-cols-1 md:grid-cols-4"
        )}>
            <div className="flex flex-col space-y-2">
              <label className="text-sm font-medium leading-none text-slate-700">Check-in</label>
              <Skeleton className="h-10 w-full bg-white/20" />
            </div>
            <div className="flex flex-col space-y-2">
              <label className="text-sm font-medium leading-none text-slate-700">Check-out</label>
              <Skeleton className="h-10 w-full bg-white/20" />
            </div>
            <div className="flex flex-col space-y-2">
              <label className="text-sm font-medium leading-none text-slate-700">Guests</label>
              <Skeleton className="h-10 w-full bg-white/20" />
            </div>
            <Skeleton className="h-10 w-full bg-blue-100/30" />
        </div>
    );
    
    if (isPopover) {
      return (
        <div className="p-4 backdrop-blur-md bg-white/20 rounded-lg border border-white/30 shadow-lg">
          {SkeletonLoader}
        </div>
      );
    }
    
    return (
      <Card className="shadow-xl max-w-5xl mx-auto backdrop-blur-md bg-white/20 border border-white/30">
        <CardContent className="p-6">
          {SkeletonLoader}
        </CardContent>
      </Card>
    );
  }
  
  const FormContent = (
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className={cn(
          "grid items-end gap-4",
          isPopover ? "grid-cols-1" : "grid-cols-1 md:grid-cols-4"
        )}>
           <FormField
              control={form.control}
              name="checkIn"
              render={({ field }) => (
                <FormItem className="flex flex-col space-y-2">
                  <FormLabel className="text-slate-700 font-semibold">Check-in</FormLabel>
                  <Popover>
                    <PopoverTrigger asChild>
                      <FormControl>
                        <Button
                          variant={"outline"}
                          className={cn(
                            "w-full justify-start text-left font-normal bg-white/40 backdrop-blur-sm border-white/50 hover:bg-white/50 transition-all duration-200",
                            !field.value && "text-slate-500"
                          )}
                        >
                          <CalendarIcon className="mr-2 h-4 w-4 text-slate-600" />
                          {field.value ? format(field.value, "PPP") : <span>Pick a date</span>}
                        </Button>
                      </FormControl>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0 backdrop-blur-md bg-white/90 border-white/50">
                      <Calendar
                        mode="single"
                        selected={field.value}
                        onSelect={field.onChange}
                        disabled={(date) => date < new Date(new Date().setHours(0,0,0,0))}
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="checkOut"
              render={({ field }) => (
                <FormItem className="flex flex-col space-y-2">
                  <FormLabel className="text-slate-700 font-semibold">Check-out</FormLabel>
                   <Popover>
                    <PopoverTrigger asChild>
                      <FormControl>
                        <Button
                          variant={"outline"}
                          className={cn(
                            "w-full justify-start text-left font-normal bg-white/20 backdrop-blur-sm border-white/20 hover:bg-white/20 transition-all duration-200",
                            !field.value && "text-slate-500"
                          )}
                        >
                          <CalendarIcon className="mr-2 h-4 w-4 text-slate-600" />
                          {field.value ? format(field.value, "PPP") : <span>Pick a date</span>}
                        </Button>
                      </FormControl>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0 backdrop-blur-md bg-white/90 border-white/50">
                      <Calendar
                        mode="single"
                        selected={field.value}
                        onSelect={field.onChange}
                        disabled={(date) => date <= (checkInDate || new Date())}
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>
                </FormItem>
              )}
            />
          <FormField
              control={form.control}
              name="guests"
              render={({ field }) => (
                <FormItem className="flex flex-col space-y-2">
                  <FormLabel className="text-slate-700 font-semibold">Guests</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger className="bg-white/40 backdrop-blur-sm border-white/50 hover:bg-white/50 transition-all duration-200">
                        <Users className="mr-2 h-4 w-4 text-slate-600" />
                        <SelectValue placeholder="Select guests" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent className="backdrop-blur-md bg-white/90 border-white/50">
                      <SelectItem value="1">1 Guest</SelectItem>
                      <SelectItem value="2">2 Guests</SelectItem>
                      <SelectItem value="3">3 Guests</SelectItem>
                      <SelectItem value="4">4 Guests</SelectItem>
                      <SelectItem value="5">5+ Guests</SelectItem>
                    </SelectContent>
                  </Select>
                </FormItem>
              )}
            />
          <Button 
            type="submit" 
            className={cn(
              "h-10 text-base bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg shadow-md hover:shadow-lg transition-all duration-200 transform hover:scale-105", 
              isPopover && "w-full"
            )}
          >
            Check Availability
          </Button>
        </form>
      </Form>
  )

  if (isPopover) {
      return (
        <div className="p-4 backdrop-blur-md bg-white/20 rounded-lg border border-white/30 shadow-lg">
            {FormContent}
        </div>
      )
  }

  return (
    <Card className="shadow-xl max-w-5xl mx-auto backdrop-blur-md bg-white/20 border border-white/30 hover:shadow-2xl transition-shadow duration-300">
      <CardContent className="p-6">
        {FormContent}
      </CardContent>
    </Card>
  )
}