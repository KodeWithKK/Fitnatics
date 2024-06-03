import { useContext } from "react";
import { GlobalContext } from "@context/GlobalContextProvider";
import GymCard from "./GymCard";
import SteperLayout from "@layouts/SteperFormLayout/SteperLayout";

const SelectGymForm = ({ selectedGym, setSelectedGym }) => {
  const { addToast } = useContext(GlobalContext);

  return (
    <SteperLayout.Form
      onSubmit={(moveNextStep) => {
        if (selectedGym) {
          moveNextStep();
        } else {
          addToast(
            "warning",
            "Select a Gym!",
            "Select a gym to proceed to the next step"
          );
        }
      }}
      stepTitle="Step 02 - Select a Gym"
    >
      <div className="flex justify-center items-center gap-3 p-6 h-full">
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
    </SteperLayout.Form>
  );
};

export default SelectGymForm;
