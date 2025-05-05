// src/components/SimilarAppsSection.jsx
import React, { useState, useEffect } from "react";
import ProgramCard from "./ProgramCard";
import "../style/SimilarAppsSection.css";
import { useStore } from "@tanstack/react-store";
import { programStore, fetchSimilarPrograms } from "../store";

const SimilarAppsSection = () => {
  const [similarPrograms, setSimilarPrograms] = useState([]);
  const [loading, setLoading] = useState(true);
  const currentProgram = useStore(
    programStore,
    (state) => state.currentProgram
  );

  useEffect(() => {
    const getSimilarPrograms = async () => {
      if (!currentProgram?.id) return;

      try {
        setLoading(true);

        // Get the category name of the current program
        const categoryName = currentProgram.category?.name;
        const programType = currentProgram.type;

        // Use the store function to fetch similar programs
        const similarProgramsData = await fetchSimilarPrograms(
          categoryName,
          programType,
          currentProgram.id,
          4
        );

        setSimilarPrograms(similarProgramsData);
      } catch (error) {
        console.error("Error fetching similar programs:", error);
        setSimilarPrograms([]);
      } finally {
        setLoading(false);
      }
    };

    getSimilarPrograms();
  }, [currentProgram]);

  // Main component render with ternary expressions
  return (
    <section className="similar-apps col-lg-12">
      {loading ? (
        <div className="d-flex flex-column gap-3">
          {[...Array(3)].map((_, index) => (
            <div key={index} className="card shadow-sm p-3">
              <div className="placeholder-glow">
                <div
                  className="placeholder col-12 mb-2"
                  style={{ height: "100px" }}
                ></div>
                <div className="placeholder col-8 mb-2"></div>
                <div className="placeholder col-4"></div>
              </div>
            </div>
          ))}
        </div>
      ) : similarPrograms.length === 0 ? (
        <div className="alert alert-info">
          No similar programs found in this category.
        </div>
      ) : (
        <div className="d-flex flex-column gap-3">
          {similarPrograms.map((program) => (
            <div key={program.id} className="w-100">
              <ProgramCard program={program} />
            </div>
          ))}
        </div>
      )}
    </section>
  );
};

export default SimilarAppsSection;
