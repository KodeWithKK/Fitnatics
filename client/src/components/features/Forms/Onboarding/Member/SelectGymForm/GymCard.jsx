import { LocationIcon, ContactIcon } from "./Icons";
import Image from "@shared/base/Image/Image";

const GymCard = ({
  gymCity,
  imgSrc,
  location,
  contactNo,
  selected,
  setSelectedGym,
}) => {
  return (
    <div
      className={`oultine-2 rounded-md border bg-gray-950 p-3 outline ${
        selected
          ? "border-gray-900/[0] outline-brand drop-shadow-[0_0px_2px_#1271ed]"
          : "border-gray-900 outline-brand/[0]"
      }`}
    >
      <Image
        src={imgSrc}
        className="rounded-md"
        alt="Noida Gym Image"
        width={"266px"}
        height={"266px"}
      />

      <div className="mt-2 flex items-center justify-between gap-2">
        <h3 className="font-semibold">{gymCity}</h3>
        <button
          type="button"
          className={`h-[36px] rounded-md px-4 ${
            selected ? "bg-brand" : "bg-gray-800/[.5]"
          }`}
          onClick={() => {
            if (selected) {
              setSelectedGym(null);
            } else {
              setSelectedGym(gymCity);
            }
          }}
        >
          {selected ? "Selected" : "Select"}
        </button>
      </div>

      <hr className="my-2 border-gray-900" />

      <div className="text-gray-500">
        <p className="flex items-center gap-2 text-[15px]">
          <LocationIcon /> <span>{location}</span>
        </p>
        <p className="flex items-center gap-2 text-[15px]">
          <ContactIcon /> <span>{contactNo}</span>
        </p>
      </div>
    </div>
  );
};

export default GymCard;
