// src/components/HealthANDFitness.jsx
import React, { useEffect, useState } from "react";
import "../style/healthFitness.css";
import { useStore } from "@tanstack/react-store";
import { programStore, fetchPrograms, getProgramsByCategory } from "../store";
import ProgramCard from "./ProgramCard";

const HealthFitness = () => {
  const [healthApps, setHealthApps] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadPrograms = async () => {
      setLoading(true);
      try {
        // Fetch apps from the Health & Fitness category (ID: 3)
        const healthAndFitnessApps = await getProgramsByCategory("Health & Fitness", 1, 3);
        
        
          // We have health & fitness apps, use them
          setHealthApps(healthAndFitnessApps);
        
      } catch (error) {
        console.error("Error fetching health & fitness apps:", error);
        setHealthApps([]);
      } finally {
        setLoading(false);
      }
    };

    loadPrograms();
  }, []);

  return (
    <section className="health-fitness-section">
      <div className="container">
        <h2 className="section-title">Health & Fitness</h2>
        
        {loading ? (
          <div className="row">
            {[...Array(3)].map((_, index) => (
              <div key={index} className="col-md-4 mb-4">
                <div className="card shadow-sm p-3">
                  <div className="placeholder-glow">
                    <div 
                      className="placeholder col-12 mb-2" 
                      style={{ height: "180px" }}
                    ></div>
                    <div className="placeholder col-8 mb-2"></div>
                    <div className="placeholder col-4"></div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : healthApps.length === 0 ? (
          <div className="alert alert-info">
            No health & fitness apps available at the moment. Check back later!
          </div>
        ) : (
          <div className="row">
            {healthApps.map((app) => (
              <div key={app.id} className="col-md-4 mb-4">
                <ProgramCard program={app} />
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default HealthFitness;
