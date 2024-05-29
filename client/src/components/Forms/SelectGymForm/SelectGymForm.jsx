import { useContext, useState } from "react";
import GymCard from "./GymCard";
import { GlobalContext } from "@context/GlobalContextProvider";

const SelectGymForm = ({ setStep, data, addData }) => {
  const [selectedGym, setSelectedGym] = useState(data?.gymLocation ?? "");
  const { addToast } = useContext(GlobalContext);

  return (
    <form
      className="place-items-center grid h-full"
      onSubmit={(e) => {
        e.preventDefault();
        if (selectedGym) {
          addData({ name: "gymLocation", value: selectedGym });
          setStep(4);
        } else {
          addToast(
            "warning",
            "Select a Gym!",
            "Select a gym to proceed to the next step"
          );
        }
      }}
    >
      <div className="p-6 max-w-[620px]">
        <div className="flex gap-3">
          <GymCard
            gymCity="Noida"
            imgSrc="images/Noida Gym.jpeg"
            location="Sector 49"
            contactNo="8692451702"
            selected={selectedGym === "Noida"}
            setSelectedGym={setSelectedGym}
          />
          <GymCard
            gymCity="Prayagraj"
            imgSrc="images/Prayagraj Gym.jpeg"
            location="Preetam Nagar"
            contactNo="8892451608"
            selected={selectedGym === "Prayagraj"}
            setSelectedGym={setSelectedGym}
          />
        </div>

        <div className="flex justify-end gap-2 mt-4">
          <button
            type="button"
            className="bg-gray-800 px-4 rounded-md h-[36px] select-none"
            onClick={() => setStep(2)}
          >
            Back
          </button>
          <button
            type="submit"
            className="bg-brand px-4 rounded-md h-[36px] select-none"
          >
            Next
          </button>
        </div>
      </div>
    </form>
  );
};

export default SelectGymForm;
