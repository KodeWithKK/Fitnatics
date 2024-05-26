import { useState } from "react";
import { LocationIcon, ContactIcon } from "./Icons";

const SelectGymForm = ({ setDisplayStep }) => {
  const [selectedGymId, setSelectedGymId] = useState(null);

  return (
    <form className="mx-auto p-6 max-w-[620px]">
      <div className="flex gap-3">
        <GymCard
          gymId={1}
          gymCity="Noida"
          imgSrc="images/Noida Gym.jpeg"
          location="Sector 49"
          contactNo="8692451702"
          selectedGymId={selectedGymId}
          setSelectedGymId={setSelectedGymId}
        />
        <GymCard
          gymId={2}
          gymCity="Prayagraj"
          imgSrc="images/Prayagraj Gym.jpeg"
          location="Preetam Nagar"
          contactNo="8892451608"
          selectedGymId={selectedGymId}
          setSelectedGymId={setSelectedGymId}
        />
      </div>

      <div className="flex justify-end gap-2 mt-4">
        <button
          type="button"
          className="bg-gray-800 px-4 rounded-md h-[36px]"
          onClick={() => setDisplayStep(2)}
        >
          Go Back
        </button>
        <button
          type="button"
          className="bg-brand px-4 rounded-md h-[36px]"
          onClick={() => setDisplayStep(4)}
        >
          Next
        </button>
      </div>
    </form>
  );
};

const GymCard = ({
  gymId,
  gymCity,
  imgSrc,
  location,
  contactNo,
  selectedGymId,
  setSelectedGymId,
}) => {
  return (
    <div
      className={`bg-gray-950 p-3 rounded-md max-w-[292px] outline oultine-2 border ${
        selectedGymId === gymId
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
            selectedGymId === gymId ? "bg-brand" : "bg-gray-800/[.5]"
          }`}
          onClick={() => {
            if (selectedGymId === gymId) {
              setSelectedGymId(null);
            } else {
              setSelectedGymId(gymId);
            }
          }}
        >
          {selectedGymId === gymId ? "Selected" : "Select"}
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

export default SelectGymForm;
