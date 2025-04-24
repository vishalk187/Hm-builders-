// Project Cost Calculator
document.addEventListener('DOMContentLoaded', () => {
  initCalculator();
});

function initCalculator() {
  const calculateBtn = document.getElementById('calculate-btn');
  const resultCard = document.getElementById('result-card');
  
  if (!calculateBtn) return;
  
  calculateBtn.addEventListener('click', calculateEstimate);
  
  // Base rates per square foot based on project type (in Rupees)
  const baseRates = {
    residential: 2000,
    commercial: 2500,
    renovation: 1500,
    infrastructure: 3000
  };
  
  // Quality level multipliers
  const qualityMultipliers = {
    standard: 1,
    premium: 1.3,
    luxury: 1.75
  };
  
  // Additional features costs (in Rupees)
  const featureCosts = {
    'feature-plumbing': 150000,
    'feature-electrical': 120000,
    'feature-hvac': 200000,
    'feature-design': 75000
  };
  
  function calculateEstimate() {
    // Get form values
    const projectType = document.getElementById('project-type').value;
    const sizeInput = document.getElementById('project-size').value;
    const qualityLevel = document.getElementById('quality-level').value;
    
    // Validate size input
    if (!sizeInput || isNaN(sizeInput) || sizeInput < 100) {
      alert('Please enter a valid project size (minimum 100 sq ft)');
      return;
    }
    
    const size = parseInt(sizeInput);
    
    // Calculate base cost
    const baseRate = baseRates[projectType];
    const baseCost = baseRate * size;
    
    // Apply quality multiplier
    const qualityMultiplier = qualityMultipliers[qualityLevel];
    const qualityAdjustment = baseCost * (qualityMultiplier - 1);
    
    // Calculate features cost
    let featuresCost = 0;
    Object.keys(featureCosts).forEach(feature => {
      const checkbox = document.getElementById(feature);
      if (checkbox && checkbox.checked) {
        featuresCost += featureCosts[feature];
      }
    });
    
    // Calculate total cost
    const totalCost = baseCost + qualityAdjustment + featuresCost;
    
    // Update result display
    document.getElementById('cost-amount').textContent = formatCurrency(totalCost);
    document.getElementById('base-cost').textContent = formatCurrency(baseCost);
    document.getElementById('quality-cost').textContent = formatCurrency(qualityAdjustment);
    document.getElementById('features-cost').textContent = formatCurrency(featuresCost);
    
    // Show result card with animation
    resultCard.classList.remove('inactive');
    
    // Save estimate to local storage
    saveEstimate(projectType, size, qualityLevel, totalCost);
  }
  
  // Format currency in Rupees
  function formatCurrency(amount) {
    return '₹' + amount.toLocaleString('en-IN', { maximumFractionDigits: 0 });
  }
  
  // Save estimate to local storage
  function saveEstimate(projectType, size, qualityLevel, totalCost) {
    const estimate = {
      projectType,
      size,
      qualityLevel,
      totalCost,
      date: new Date().toISOString()
    };
    
    // Get existing estimates or initialize empty array
    const estimates = JSON.parse(localStorage.getItem('costEstimates')) || [];
    
    // Add new estimate
    estimates.push(estimate);
    
    // Save back to local storage
    localStorage.setItem('costEstimates', JSON.stringify(estimates));
  }
  
  // Add event listener to features
  const featureCheckboxes = document.querySelectorAll('.feature-checkbox');
  featureCheckboxes.forEach(checkbox => {
    checkbox.addEventListener('change', () => {
      if (resultCard.classList.contains('inactive')) {
        return;
      }
      
      // Recalculate if result is already showing
      calculateEstimate();
    });
  });
  
  // Add event listeners to other inputs for live update
  document.getElementById('project-type').addEventListener('change', () => {
    if (!resultCard.classList.contains('inactive')) {
      calculateEstimate();
    }
  });
  
  document.getElementById('project-size').addEventListener('input', () => {
    if (!resultCard.classList.contains('inactive')) {
      calculateEstimate();
    }
  });
  
  document.getElementById('quality-level').addEventListener('change', () => {
    if (!resultCard.classList.contains('inactive')) {
      calculateEstimate();
    }
  });
}