import GameCard from "./GameCard";

export default function GamesSection() {
    return (
        <div class="container py-5">
            <h2 class="mb-4">Popular Games</h2>
            <div class="row g-4">
                <GameCard />
            </div>
        </div>
    );
}
