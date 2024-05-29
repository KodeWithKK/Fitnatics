import { LocationIcon, ContactIcon } from "./Icons";

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
      className={`bg-gray-950 p-3 rounded-md max-w-[292px] outline oultine-2 border ${
        selected
          ? "outline-brand drop-shadow-[0_0px_4px_#1271ed] border-gray-900/[0]"
          : "outline-brand/[0] border-gray-900"
      }`}
    >
      <img src={imgSrc} className="rounded-md" alt="Noida Gym Image" />

      <div className="flex justify-between gap-2 mt-2">
        <h5 className="font-semibold">{gymCity}</h5>
        <button
          type="button"
          className={`px-4 rounded-md h-[36px] ${
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

      <hr className="border-gray-900 my-2" />

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
