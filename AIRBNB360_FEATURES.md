# Airbnb360 Platform - Feature Documentation

## 🚀 Overview
Airbnb360 is an AI-powered intelligence platform that enriches Airbnb listing data with advanced ML scores, NLP insights, and predictive analytics.

## ✨ Key Features Implemented

### 1. Upload Experience
- **Animated Progress Indicator**
  - Multi-stage progress: Reading → Parsing → Analyzing → ML Features → Insights
  - Real-time percentage display
  - Smooth transitions and animations
  - Loading spinner and success checkmark

### 2. AI/ML Enrichment Engine

#### Host Personality Classifier (NLP)
- Analyzes house rules text using keyword extraction
- Classifies hosts into 6 personality types:
  - **Friendly**: Welcoming, relaxed hosts
  - **Strict**: Rule-enforcing, structured hosts
  - **Family**: Child-friendly, family-oriented
  - **Party**: Entertainment-focused, social
  - **Minimalist**: Quiet, simple, organized
  - **Professional**: Business-oriented, workspace-equipped
- Returns confidence score and extracted keywords

#### Trust Score (0-100)
Composite metric based on:
- Host verification status (30% weight)
- Number of reviews (30% weight)
- Response rate/review frequency (20% weight)
- Cancellation policy flexibility (20% weight)

#### Sustainability & Eco Score (0-100)
Environmental impact assessment:
- **Building Age Factor**: Newer buildings score higher
- **Turnover Rate**: Lower turnover = more sustainable
- **Long-stay Preference**: Minimum nights ≥7 days score higher
- **Eco-Friendly Badge**: Awarded for scores ≥75

#### Risk & Fraud Detection
Anomaly detection system checking:
- Unverified hosts
- High availability with zero reviews
- Extreme price deviations from neighborhood average
- Unusual minimum stay requirements
- Risk levels: Low / Medium / High

#### Accessibility Index (0-100)
Keyword-based feature detection:
- ♿ Wheelchair accessible
- 🏢 Elevator/lift available
- 🐕 Pet-friendly
- 👶 Kid-friendly
- 🚗 Parking available

#### Price Analysis & Forecasting
- **Fairness Score**: Comparison to neighborhood average
- **Trend Detection**: Rising / Stable / Falling
- **Forecasts**: Next month and next quarter predictions
- **Market Position**: Above/below market indicators

### 3. Dashboard Features

#### Main Statistics Cards
- Total Listings count
- Average Price
- Average Reviews
- Average Availability (days)

#### AI Insights Panel
Real-time ML metrics:
- Average Trust Score across all listings
- Eco-Friendly percentage
- High-Risk listing count
- Average Sustainability score

#### Data Visualizations
- Room Type Distribution (bar chart)
- Top Neighborhoods (bar chart)
- Host Personality Types (NLP-powered chart)
- Price Range Distribution

#### Enhanced Listings Table
Each listing displays:
- Property name and host
- Location with map icon
- Room type badge
- Price with fairness indicator
- **ML Scores Column**:
  - 🛡️ Trust Score
  - 🍃 Eco Score
  - ✨ Host Personality
- **Risk Badge**: Color-coded risk level

### 4. Data Processing Pipeline
1. CSV parsing and validation
2. Neighborhood-level aggregation
3. Price normalization and outlier detection
4. ML enrichment (all 6 scores computed)
5. Real-time rendering

## 🎨 Design Features
- Modern gradient backgrounds (cyan/blue theme)
- Smooth animations and transitions
- Hover effects on cards and table rows
- Responsive grid layouts
- Professional typography
- Badge systems for quick visual identification

## 📊 Technical Architecture

### Data Flow
```
CSV Upload → Parser → Enrichment Engine → Dashboard
                         ↓
                    [6 ML Models]
                         ↓
                  EnrichedListing[]
```

### Key Files
- `types/enriched.ts` - Enhanced type definitions with ML scores
- `utils/enrichment.ts` - ML/NLP scoring algorithms
- `components/FileUpload.tsx` - Animated upload experience
- `components/Dashboard.tsx` - Main analytics view
- `components/ListingsTable.tsx` - Enhanced table with scores
- `components/ScoreCard.tsx` - Circular score visualizations

## 🔮 Future Enhancements (Ready to Implement)
- Interactive geospatial map with Leaflet
- Neighborhood vibe heatmaps
- Guest-host compatibility matcher
- Exportable PDF reports
- Supabase database integration for persistence
- Time-series forecasting with Prophet
- Real ML models (sentence-transformers, RandomForest)

## 🚀 Usage
1. Upload Airbnb CSV file
2. Watch AI processing animation
3. Explore enriched dashboard with ML insights
4. Filter and analyze listings
5. View detailed scores in table

---

**Built with**: React, TypeScript, Tailwind CSS, Vite
**ML Techniques**: NLP, Anomaly Detection, Feature Engineering, Forecasting
