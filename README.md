# Fraud Detection Research: Dynamic Stacking for Imbalanced Data

## Overview

Financial fraud detection is a challenging machine learning problem because fraudulent transactions represent only a small fraction of all transactions. Traditional classification models can achieve high accuracy while failing to identify a significant proportion of actual fraud cases.

This project investigates machine learning approaches for fraud detection, with a focus on improving classification performance on highly imbalanced datasets through **dynamic stacking and ensemble learning**.

## Motivation and Existing Work

Existing research has explored several approaches to fraud detection, including individual classifiers such as Logistic Regression, Decision Trees, Random Forests, and XGBoost, as well as ensemble learning techniques.

Although these approaches can provide strong predictive performance, several challenges remain:

- **Class imbalance:** Models may favor the majority class and fail to detect enough fraudulent transactions.
- **Static ensemble behavior:** Conventional stacking typically combines base-model predictions using a fixed meta-learner, which may not adapt effectively to different transaction patterns.
- **Misleading evaluation:** Accuracy alone does not adequately represent fraud-detection performance when the classes are highly imbalanced.
- **Generalization:** Performance may vary across datasets with different transaction characteristics and feature distributions.

These challenges motivate an investigation into whether a more adaptive ensemble approach can improve fraud detection.

*Note: The specific limitations of the original research paper will be documented after reviewing its methodology, results, and stated limitations.*

## Proposed Approach

This project aims to implement and evaluate a dynamic stacking framework and compare its performance against established baseline models.

The planned workflow includes:

1. **Exploratory Data Analysis:** Examine transaction features, missing values, class distributions, and dataset characteristics.
2. **Baseline Models:** Establish reference performance using conventional machine learning classifiers.
3. **XGBoost:** Evaluate a gradient-boosting model as a strong standalone baseline.
4. **Dynamic Stacking:** Implement and investigate an adaptive stacking strategy, with the design and adaptation mechanism documented explicitly.
5. **Comparative Evaluation:** Compare all approaches using consistent data splits, preprocessing, and evaluation metrics.

The proposed method will be evaluated experimentally rather than assumed to outperform existing models.

## Datasets

The research will investigate two fraud-detection datasets:

- **IEEE-CIS Fraud Detection:** Transaction and identity features for predicting fraudulent online transactions.
- **PaySim:** Synthetic mobile-money transaction data designed to simulate financial transactions and fraudulent activity.

Dataset availability, licensing, feature compatibility, and preprocessing requirements will be documented before experimentation.

Raw datasets will not be committed to this repository.

## Evaluation Metrics

Because fraud detection involves class imbalance, the evaluation will consider:

- Precision
- Recall
- F1-score
- ROC-AUC
- PR-AUC (Precision–Recall AUC)
- Confusion matrix

Recall will help measure how many fraudulent transactions are detected, while precision will measure how many flagged transactions are actually fraudulent. PR-AUC will provide an important view of performance on the minority class.
