"use client";

import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import ScheduleForm from "@/components/calendar/ScheduleForm";
import { addCalendarSchedule } from "@/utils/CalendarStorage";
import "@/styles/calendar/addSchedule.scss";

const formatTime = (time) => {
  return new Date(`2035-01-01T${time}`).toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
  });
};

export default function AddSchedulePage() {
  const router = useRouter();

  const handleAddSchedule = (data) => {
    const finalData = {
      title: data.title,
      type: data.type,
      date: data.date,
      time: `${formatTime(data.startTime)} - ${formatTime(data.endTime)}`,
      location: data.location,
      team: data.team.split(",").map((item) => item.trim()).filter(Boolean),
      members: data.members
        ? data.members.split(",").map((item) => (item.trim() ? item.trim() : " "))
        : [],
      extraMembers: Number(data.extraMembers) || 0,
      notes: data.notes,
    };

    addCalendarSchedule(finalData);

    toast.success("Schedule added successfully!");

    setTimeout(() => {
      router.push("/calendar");
    }, 1200);
  };

  return (
    <div className="calendar-action-page">
      <ScheduleForm buttonText="Add Schedule" onSubmit={handleAddSchedule} />
    </div>
  );
}