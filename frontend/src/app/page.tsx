"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Apartment } from "@/types/Apartment.type";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import Image from "next/image";

// Icons
import { IoIosExpand } from "react-icons/io";
import { FaBoxOpen } from "react-icons/fa6";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { MdOutlineLocationOn } from "react-icons/md";
import { LuBedDouble } from "react-icons/lu";
import { LuBath } from "react-icons/lu";
import { Button } from "@/components/ui/button";
import { CgDetailsMore } from "react-icons/cg";
import { IoCall } from "react-icons/io5";
import { IoMdAdd } from "react-icons/io";
import ApartmentCard from "./components/ApartmentCard";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { ApartmentAddFrom } from "./components/ApartmentAddForm";
import React from "react";
import { Input } from "@/components/ui/input";

export default function Home() {
  const queryClient = useQueryClient();

  const { data, isError, error, isPending } = useQuery({
    queryKey: ["apartments"],
    queryFn: getData,
  });

  const [search, setSearch] = React.useState("");

  //const [minPrice, setMinPrice] = React.useState(0);
  //const [maxPrice, setMaxPrice] = React.useState(Infinity);

  const [formOpen, setFormOpen] = React.useState(false);

  const addMutation = useMutation({
    mutationFn: addApartment,
    onSuccess: () => {
      // Invalidate and refetch
      queryClient.invalidateQueries({
        queryKey: ["apartments"],
      });
    },
  });

  const handleFormSubmit = (data: any) => {
    addMutation.mutate(data, {
      onSuccess: () => {
        setFormOpen(false);
      },
    });
  };

  return (
    <main className="flex flex-col gap-3 items-center p-5 min-h-screen sm:p-10">
      <div className="flex gap-2 justify-between items-center p-3 w-full h-20 bg-gray-100 rounded-lg">
        <Input
          placeholder="Search"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="max-w-72"
        />

        <Dialog
          open={formOpen || addMutation.isPending}
          onOpenChange={(open) => setFormOpen(open)}
        >
          <DialogTrigger asChild>
            <Button variant="outline">
              <IoMdAdd className="mr-2 w-6 h-6" />
              Add
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[500px]">
            <DialogHeader>
              <DialogTitle>Details</DialogTitle>
              <DialogDescription></DialogDescription>
            </DialogHeader>
            <ApartmentAddFrom onFormSubmit={handleFormSubmit} />
            <DialogFooter></DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
      {!isPending && data && data.length === 0 && (
        <div className="flex flex-col gap-2 items-center h-full">
          <FaBoxOpen className="size-12" />
          <span className="text-2xl">No Apartments</span>
        </div>
      )}

      {isError && (
        <span className="text-2xl text-red-600">{error.message}</span>
      )}
      {isPending && (
        <div className="flex flex-col gap-2 items-center">
          <span className="text-2xl text-gray-500 animate-pulse">Loading</span>
        </div>
      )}

      <div className="grid grid-cols-1 gap-10 w-full sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {data
          ?.filter((apartment) => {
            return (
              apartment.title.toLowerCase().includes(search.toLowerCase()) ||
              apartment.location.toLowerCase().includes(search.toLowerCase())
            );
          })
          .map((apartment) => (
            <ApartmentCard key={apartment.id} apartment={apartment} />
          ))}
      </div>
    </main>
  );
}

async function getData() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/apartments`);

  // The return value is *not* serialized
  // You can return Date, Map, Set, etc.

  if (!res.ok) {
    // This will activate the closest `error.js` Error Boundary
    throw new Error("Failed to fetch data");
  }

  return res.json() as Promise<Apartment[]>;
}

async function addApartment(data: Apartment) {
  const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/apartments`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }

  return res.json() as Promise<Apartment>;
}
