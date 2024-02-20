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
('GPT-3', '2024-04-05 10:15:00', 'perplexity', '/path/to/model10', 3.4, 3.2, 'GPT-3 for text generation, low perplexity.', 1),
('Mnist', '2024-02-19 17:00:00', 'euclidean', '/path/to/model2', 0.035, 0.031, 'First model, additional run.', 0),
('Cifar10', '2024-02-20 14:30:00', 'accuracy', '/path/to/model3', 0.14, 0.18, 'Second model, additional run.', 1),
('Imagenet', '2024-02-21 09:45:00', 'top-5-accuracy', '/path/to/model4', 0.45, 0.39, 'Third model, additional run.', 0),
('VGG16','2024-03-05 10:30:00','accuracy','/path/to/model5',0.220, .25,'VGG16 on ImageNet, additional run.',1),
('ResNet50','2024-03-10 16:00:00','top-1-accuracy','/path/to/model6',0.190, .20,'ResNet50, additional run.',0),
('MNIST','2024-03-15 09:20:00','cross-entropy','/path/to/model7',0.030, .03,'Improved training process with cross-entropy., additional run.',0),
('Cifar100','2024-03-20 14:45:00','accuracy','/path/to/model8',0.270, .21,'Cifar100 dataset with custom architecture., additional run.',1),
('BERT','2024-03-25 11:00:00','F1-score','/path/to/model9',0.840, .88, 'BERT model for NLP tasks, additional run.',1);
