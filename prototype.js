const carbonForm = document.getElementById('carbonForm');
const resultDiv = document.getElementById('result');
const recommendationsDiv = document.getElementById('recommendations');

carbonForm.addEventListener('submit', function(event) {
    event.preventDefault();
    const transportation = document.querySelector('input[name="transportation"]:checked').value;
    const distance = parseFloat(document.getElementById('distance').value);
    const air = document.querySelector('input[name="air"]:checked').value;
    const energy = document.querySelector('input[name="energy"]:checked').value;
    const recycle = document.querySelector('input[name="recycle"]:checked').value;

    if (isNaN(distance) || distance <= 0) {
        resultDiv.textContent = 'Please enter a valid distance value.';
        recommendationsDiv.innerHTML = '';
    } else {
        const footprint = calculateCarbonFootprint(transportation, distance, air, energy, recycle);
        resultDiv.textContent = `Your carbon footprint is ${footprint.toFixed(2)} tons per year.`;
        const recommendations = getRecommendationsForFootprint(footprint);
        displayRecommendations(recommendations);
    }
});

function calculateCarbonFootprint(transportation, distance, air, energy, recycle) {
    let transportationFootprint = 0;
    let airFootprint = 0;
    let energyFootprint = 0;
    let recycleFootprint = 0;

    // Transportation footprint
    switch (transportation) {
        case 'car':
            transportationFootprint = distance * 0.000404; // Assuming 0.404 kg CO2 per km for an average car
            break;
        case 'motorcycle':
            transportationFootprint = distance * 0.000116; // Assuming 0.116 kg CO2 per km for a motorcycle
            break;
        case 'public':
            transportationFootprint = distance * 0.000102; // Assuming 0.102 kg CO2 per km for public transport
            break;
        case 'ev':
            transportationFootprint = distance * 0.000054; // Assuming 0.054 kg CO2 per km for an electric vehicle
            break;
    }

    // Air travel footprint
    switch (air) {
        case 'never':
            airFootprint = 0;
            break;
        case 'medium':
            airFootprint = 2000; // Assuming 2000 kg CO2 for medium-haul flights
            break;
        case 'long':
            airFootprint = 6000; // Assuming 6000 kg CO2 for long-haul flights
            break;
        case 'ultra':
            airFootprint = 10000; // Assuming 10000 kg CO2 for ultra-long-haul flights
            break;
    }

    // Energy-saving practices footprint
    switch (energy) {
        case 'always':
            energyFootprint = 0.5; // Assuming 50% reduction in energy footprint
            break;
        case 'frequently':
            energyFootprint = 0.7; // Assuming 30% reduction in energy footprint
            break;
        case 'sometimes':
            energyFootprint = 0.9; // Assuming 10% reduction in energy footprint
            break;
        case 'never':
            energyFootprint = 1; // No reduction
            break;
    }

    // Recycling and composting footprint
    switch (recycle) {
        case 'always':
            recycleFootprint = 0.2; // Assuming 80% reduction in waste footprint
            break;
        case 'frequently':
            recycleFootprint = 0.4; // Assuming 60% reduction in waste footprint
            break;
        case 'sometimes':
            recycleFootprint = 0.6; // Assuming 40% reduction in waste footprint
            break;
        case 'never':
            recycleFootprint = 1; // No reduction
            break;
    }

    const totalFootprint = (transportationFootprint + airFootprint) * energyFootprint * recycleFootprint;
    return totalFootprint / 0.9072; // Convert to tons
}

function getRecommendationsForFootprint(footprint) {
    const recommendations = [];

    if (footprint > 20) {
        recommendations.push('Consider switching to a plant-based diet and reducing meat consumption.');
        recommendations.push('Explore solar or wind energy options for your home.');
        recommendations.push('Invest in an electric or hybrid vehicle for transportation.');
    }

    if (footprint > 15) {
        recommendations.push('Reduce energy consumption by using energy-efficient appliances and lighting.');
        recommendations.push('Implement better insulation and weatherization in your home.');
    }

    if (footprint > 10) {
        recommendations.push('Reduce water consumption by fixing leaks and installing water-saving fixtures.');
        recommendations.push('Practice recycling and composting to reduce waste.');
    }

    if (footprint > 5) {
        recommendations.push('Use public transportation, bike, or walk whenever possible.');
        recommendations.push('Purchase locally sourced and seasonal products.');
    }

    recommendations.push('Plant trees and support reforestation efforts.');
    recommendations.push('Educate others about the importance of reducing carbon footprint.');

    return recommendations;
}

function displayRecommendations(recommendations) {
    recommendationsDiv.innerHTML = '';
    const recommendationsList = document.createElement('ul');
    recommendations.forEach(function(recommendation) {
        const li = document.createElement('li');
        li.textContent = recommendation;
        recommendationsList.appendChild(li);
    });
    recommendationsDiv.appendChild(recommendationsList);
}