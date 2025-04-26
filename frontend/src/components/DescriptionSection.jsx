import React from 'react'
import { Container, Row, Col } from 'react-bootstrap'
import SimilarAppsSection from './Similar apps Section'

// Dummy data
// const description = [
//   "The game is set in a post-apocalyptic world where players must navigate through a series of challenges and obstacles to survive.",
//   "Players can choose to play as one of several different characters, each with their own unique abilities and skills.",
//   "The game features a variety of environments, including abandoned cities, dense forests, and treacherous mountains, all of which are filled with dangerous creatures and hostile factions.",
//   "Players must scavenge for resources, craft weapons and tools, and build shelters to protect themselves from the elements and enemy attacks.",
//   "The game also includes a deep crafting system that allows players to create a wide range of items, from basic tools to advanced technology."
// ]

export function DescriptionSection({description}) {
  return (
    <Container className="mt-5">
      <Row>
        <Col lg={12} className="bg-white rounded-4 border shadow-sm p-4">
          <h3>Description</h3>
          <hr />
          <div className="mt-2">
            {description}
            {/* {description.map((paragraph, index) => (
              <p key={index} className="mb-3">{paragraph}</p>
            ))} */}
          </div>
        </Col>
      </Row>
    </Container>
  
  
  )

}
