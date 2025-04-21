import React from 'react'
import { HeroGameDetails } from "../components/HeroGameDetails"
import { DescriptionSection } from "../components/DescriptionSection" 
import { RatingSection } from  "../components/RatingSection"
import { Feature } from "../components/Feature"

export function GameDetailsPage() {
  return (
    <>
       <div className="bg-light">
                <HeroGameDetails/>
                <DescriptionSection/> 
                <RatingSection />
                <Feature/>
            </div>
    </>
  )
}
