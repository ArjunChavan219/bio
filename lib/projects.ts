export interface Project {
  id: string;
  title: string;
  tags: string[];
  summary: string;
  description: {
    problem: string;
    whatYouBuilt: string;
    keyDecisions: string;
    whatItShows: string;
  };
}

export const projects: Project[] = [
  {
    id: "little-go",
    title: "Little Go AI Player",
    tags: ["AI", "Python", "Game Theory"],
    summary: "Game-playing AI using minimax search and board evaluation heuristics",
    description: {
      problem:
        "The problem was straightforward: implement an AI player for Little Go (simplified Go on a smaller board) that could beat a human player consistently.",
      whatYouBuilt:
        "I built the AI using minimax search with alpha-beta pruning to reduce the search space, paired with a heuristic board evaluator that scored positions based on territory control, group safety, and influence. The evaluator learned which features mattered (edge vs. center control, connected groups vs. isolated stones) through iterative refinement.",
      keyDecisions:
        "The key decision was the balance between search depth and evaluation quality. I could go deeper if the evaluator was faster, but a smarter evaluator meant shallower search was enough. I tuned this until the bot reliably won ~80% of games against test players.",
      whatItShows:
        "What it shows: search algorithms, heuristic design, and the engineering of game-playing systems — the same optimization thinking that powers agent orchestration and decision-making at scale.",
    },
  },
  {
    id: "covid-lstm",
    title: "COVID-19 Prediction LSTM",
    tags: ["ML", "Time Series", "Flask"],
    summary: "Time-series model predicting COVID case counts with 85% precision across multiple countries",
    description: {
      problem:
        "Early 2021, the pandemic was still unfolding unpredictably. I wanted to test whether historical case data could forecast future case counts in a given region — useful for resource planning.",
      whatYouBuilt:
        "I trained an LSTM on case-count time series from multiple countries (India, Germany, Italy, Spain), capturing the temporal dependencies in the spread patterns. The model achieved 85% precision on test sets, meaning it rarely over-predicted (which would cause over-allocation of resources). Deployed it as a Flask web app with a simple HTML front end so anyone could input a region and see a forecast.",
      keyDecisions:
        "The challenge was avoiding overfitting on region-specific anomalies (lockdowns, policy changes) while keeping the model general enough to work across countries. I addressed this with dropout regularization and validation splits per country, not global.",
      whatItShows:
        "What it shows: ML fundamentals (time-series modeling, evaluation discipline), and the full cycle from training to deployment.",
    },
  },
  {
    id: "isro-drone",
    title: "Drone Route Planning Algorithm",
    tags: ["Optimization", "Algorithms", "ISRO"],
    summary: "Algorithm for 70% more efficient autonomous drone routes accounting for constraints",
    description: {
      problem:
        "ISRO (Indian Space Research Organization) had a problem: given a drone's battery, fuel stations, and a geography with obstacles, plan a route that minimizes distance and time. This was the Smart India Hackathon 2019 prompt.",
      whatYouBuilt:
        "I engineered an algorithm that improved route efficiency by ~70% over baseline greedy routing. The system considered: dynamic battery constraints (the drone's remaining power and nearest refueling points), terrain and obstacles (geography baked into the heuristic so the algorithm avoided dead ends), and real-time adjustment (if conditions changed mid-flight, the planner could re-route without recalculating from scratch). I built interactive visualizations using AngularJS, HTML/CSS, and Google Maps API so judges could see the planned route and watch it adjust in simulation.",
      keyDecisions:
        "The core insight was treating this as a constraint-satisfaction problem, not just shortest-path. A shorter route that runs out of battery isn't a route at all.",
      whatItShows:
        "What it shows: algorithmic optimization, systems thinking under constraints, and the ability to communicate complex technical work visually.",
    },
  },
];
