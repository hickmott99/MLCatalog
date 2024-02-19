CREATE TABLE Models (
    modelID INTEGER PRIMARY KEY AUTOINCREMENT,
    datasetName TEXT NOT NULL,
    runDatetime TEXT NOT NULL,
    modelMetric TEXT NOT NULL,
    modelPath TEXT NOT NULL,
    trainingLoss REAL NOT NULL,
    validationLoss REAL NOT NULL,
    notes TEXT,
    favorite BOOLEAN NOT NULL CHECK (Favorite IN (0, 1))
);
