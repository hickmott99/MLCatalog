/******************************************************************************
  Models
 *****************************************************************************/
INSERT INTO Models (datasetName, runDatetime, modelMetric, modelPath, trainingLoss, validationLoss, notes, favorite) VALUES
('Mnist', '2024-02-19 17:00:00', 'euclidean', '/path/to/model1', 0.025, 0.035, 'First model, initial run.', 1),
('Cifar10', '2024-02-20 14:30:00', 'accuracy', '/path/to/model2', 0.15, 0.18, 'Second model, improved accuracy.', 0),
('Imagenet', '2024-02-21 09:45:00', 'top-5-accuracy', '/path/to/model3', 0.45, 0.40, 'Third model, complex dataset.', 1),
('VGG16', '2024-03-05 10:30:00', 'accuracy', '/path/to/model4', 0.23, 0.25, 'VGG16 on ImageNet, initial attempt.', 0),
('ResNet50', '2024-03-10 16:00:00', 'top-1-accuracy', '/path/to/model5', 0.19, 0.21, 'ResNet50, high accuracy on ImageNet.', 1),
('MNIST', '2024-03-15 09:20:00', 'cross-entropy', '/path/to/model6', 0.032, 0.028, 'Improved training process with cross-entropy.', 0),
('Cifar100', '2024-03-20 14:45:00', 'accuracy', '/path/to/model7', 0.27, 0.22, 'Cifar100 dataset with custom architecture.', 1),
('BERT', '2024-03-25 11:00:00', 'F1-score', '/path/to/model8', 0.85, 0.88, 'BERT model for NLP tasks, high F1-score.', 1),
('YOLO', '2024-04-01 15:30:00', 'mAP', '/path/to/model9', 0.55, 0.53, 'YOLO object detection, moderate mAP.', 0),
('GPT-3', '2024-04-05 10:15:00', 'perplexity', '/path/to/model10', 3.5, 3.2, 'GPT-3 for text generation, low perplexity.', 1),
('GPT-3', '2024-04-05 10:15:00', 'perplexity', '/path/to/model10', 3.7, 3.2, 'GPT-3 for text generation, low perplexity.', 1),
('GPT-3', '2024-04-05 10:15:00', 'perplexity', '/path/to/model10', 3.6, 3.2, 'GPT-3 for text generation, low perplexity.', 0),
('GPT-3', '2024-04-05 10:15:00', 'perplexity', '/path/to/model10', 3.4, 3.2, 'GPT-3 for text generation, low perplexity.', 1);

--  INSERT INTO Models (datasetName, runDatetime, modelMetric, modelPath, trainingLoss, validationLoss, notes, favorite) VALUES
-- (LOWER('Mnist'), '2024-02-19 17:00:00', LOWER('euclidean'), LOWER('/path/to/model1'), 0.025, 0.035, LOWER('First model, initial run.'), 1),
-- (LOWER('Cifar10'), '2024-02-20 14:30:00', LOWER('accuracy'), LOWER('/path/to/model2'), 0.15, 0.18, LOWER('Second model, improved accuracy.'), 0),
-- (LOWER('Imagenet'), '2024-02-21 09:45:00', LOWER('top-5-accuracy'), LOWER('/path/to/model3'), 0.45, 0.40, LOWER('Third model, complex dataset.'), 1),
-- (LOWER('VGG16'), '2024-03-05 10:30:00', LOWER('accuracy'), LOWER('/path/to/model4'), 0.23, 0.25, LOWER('VGG16 on ImageNet, initial attempt.'), 0),
-- (LOWER('ResNet50'), '2024-03-10 16:00:00', LOWER('top-1-accuracy'), LOWER('/path/to/model5'), 0.19, 0.21, LOWER('ResNet50, high accuracy on ImageNet.'), 1),
-- (LOWER('MNIST'), '2024-03-15 09:20:00', LOWER('cross-entropy'), LOWER('/path/to/model6'), 0.032, 0.028, LOWER('Improved training process with cross-entropy.'), 0),
-- (LOWER('Cifar100'), '2024-03-20 14:45:00', LOWER('accuracy'), LOWER('/path/to/model7'), 0.27, 0.22, LOWER('Cifar100 dataset with custom architecture.'), 1),
-- (LOWER('BERT'), '2024-03-25 11:00:00', LOWER('F1-score'), LOWER('/path/to/model8'), 0.85, 0.88, LOWER('BERT model for NLP tasks, high F1-score.'), 1),
-- (LOWER('YOLO'), '2024-04-01 15:30:00', LOWER('mAP'), LOWER('/path/to/model9'), 0.55, 0.53, LOWER('YOLO object detection, moderate mAP.'), 0),
-- (LOWER('GPT-3'), '2024-04-05 10:15:00', LOWER('perplexity'), LOWER('/path/to/model10'), 3.5, 3.2, LOWER('GPT-3 for text generation, low perplexity.'), 1),
-- (LOWER('GPT-3'), '2024-04-05 10:15:00', LOWER('perplexity'), LOWER('/path/to/model10'), 3.7, 3.2, LOWER('GPT-3 for text generation, low perplexity.'), 1),
-- (LOWER('GPT-3'), '2024-04-05 10:15:00', LOWER('perplexity'), LOWER('/path/to/model10'), 3.6, 3.2, LOWER('GPT-3 for text generation, low perplexity.'), 0),
-- (LOWER('GPT-3'), '2024-04-05 10:15:00', LOWER('perplexity'), LOWER('/path/to/model10'), 3.4, 3.2, LOWER('GPT-3 for text generation, low perplexity.'), 1);
