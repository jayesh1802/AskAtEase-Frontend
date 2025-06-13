import React, { useContext } from "react";
import CreateSpace from "./CreateSpace";
import { SpaceContext } from "../contexts/SpaceContext";

const LeftSection = () => {
  const { spaces, dispatch } = useContext(SpaceContext);
  console.log(spaces);

  return (
    <div className="w-1/5" style={{ width: "100%" }}>
      {/* Create Space Section */}
      <div className="right_values rounded-lg shadow overflow-hidden">
        <CreateSpace dispatch={dispatch} />

        {/* Space Sections */}
        {spaces.map((space) => (
          <section
            key={space.spaceId}
            className="p-4 mt-2 mr-1 ml-1 flex items-start space-x-4 border border-gray-300 rounded-md mb-2"
          >
            <div>
              <a
                className="font-bold hover:underline cursor-pointer"
              >
                {space.spaceName}
              </a>
              <p className="text-sm text-gray-600">{space.description}</p>
            </div>
          </section>
        ))}
      </div>
    </div>
  );
};

export default LeftSection;
