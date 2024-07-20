import { Apartment } from "@/types/Apartment.type";
import Image from "next/image";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import ApartmentDetailsPage from "./ApartmentDetailsPage";

// Icons
import { IoIosExpand } from "react-icons/io";
import { LuBedDouble } from "react-icons/lu";
import { LuBath } from "react-icons/lu";
import { Button } from "@/components/ui/button";
import { CgDetailsMore } from "react-icons/cg";
import { IoCall } from "react-icons/io5";
import { MdOutlineLocationOn } from "react-icons/md";

type ApartmentCardProps = {
  apartment: Apartment;
};

export default function ApartmentCard({ apartment }: ApartmentCardProps) {
  return (
    <div className="w-full rounded-lg border shadow-sm bg-card text-card-foreground">
      <div className="flex flex-col p-6 space-y-1.5">
        <div className="text-2xl font-semibold tracking-tight leading-none">
          {new Intl.NumberFormat("en-US", {
            style: "currency",
            currency: apartment.currency,
          }).format(apartment.price)}
        </div>
        <div className="overflow-hidden text-lg text-muted-foreground overflow-ellipsis text-nowrap">
          {apartment.title}
        </div>
      </div>
      <div className="p-6 pt-0">
        <div className="relative w-full h-48">
          <div style={{ borderRadius: "20px", overflow: "hidden" }}>
            <Image
              src={`https://picsum.photos/500`}
              layout="fill"
              objectFit="cover"
              alt={apartment.title}
            />
          </div>
        </div>
        <div className="mt-4">
          {" "}
          <div className="flex items-center space-x-2">
            <MdOutlineLocationOn />
            <span>{apartment.location}</span>
          </div>
        </div>
        <div className="flex gap-4 mt-4">
          <div className="flex items-center space-x-2">
            <LuBedDouble />
            <span>{apartment.bed_rooms}</span>
          </div>
          <div className="flex items-center space-x-2">
            <LuBath />
            <span>{apartment.bath_rooms}</span>
          </div>
          <div className="flex items-center space-x-2">
            <IoIosExpand />
            <span>{apartment.area} m²</span>
          </div>
        </div>
      </div>
      <div className="flex gap-2 items-center p-6 pt-0">
        {/* <Button className="flex-grow" variant="default"> */}
        {/*   <IoCall className="mr-2 w-6 h-6" /> */}
        {/*   Contact */}
        {/* </Button> */}
        <Dialog>
          <DialogTrigger asChild>
            <Button className="flex-grow" variant="outline">
              <CgDetailsMore className="mr-2 w-6 h-6" />
              Details
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[600px]">
            <DialogHeader>
              <DialogTitle>Details</DialogTitle>
              <DialogDescription></DialogDescription>
            </DialogHeader>
            <ApartmentDetailsPage id={apartment.id} />
            <DialogFooter></DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
}
