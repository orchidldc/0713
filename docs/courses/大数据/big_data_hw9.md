<div STYLE="page-break-after: always;"></div>

## Big Data HW9

LI Dacheng (12431477)

### Task 1:

> Train a multilayer perceptron and asses how well it predicts on test data.

---

**Data Preprocessing**

We normalized both the training and testing datasets using the mean and standard deviation values derived from the training set.

- **Mean:** 0.131
- **Standard Deviation:** 0.308

Next, we calculated the distribution of each label in the training dataset:

To set a baseline for model accuracy, we assume an equal distribution, using 10% as a naive benchmark for each class.

- **Label 5:** 9.04%
- **Label 0:** 9.87%
- **Label 4:** 9.74%
- **Label 1:** 11.24%
- **Label 9:** 9.92%
- **Label 2:** 9.93%
- **Label 3:** 10.22%
- **Label 6:** 9.86%
- **Label 7:** 10.44%
- **Label 8:** 9.75% 

**MLP Architecture:**

The architecture of our neural network, named `DCNW`, is as follows:

- **Layer fc1:** Fully connected layer with 784 input features and 256 output features (bias enabled)
- **Layer fc2:** Fully connected layer with 256 input features and 128 output features (bias enabled)
- **Layer fc3:** Fully connected layer with 128 input features and 10 output features (bias enabled)
- **Activation Function:** ReLU
- **Dropout Layer:** Dropout with a probability of 0.2 (in-place set to False)

We applied 5-fold cross-validation to train the model and assess its performance on the test dataset:

- **Mean Accuracy:** 0.98
- **Standard Deviation of Accuracy:** 0.0021

### Task 2:

> Same as Task 1 but implement a convolutional neural network. Specify the architecture that you use. Compare the prediction with the one from Task 1.

---

**CNN Architecture:**

The architecture of our Convolutional Neural Network (`CNN`) is structured as follows:

- **Layer conv1:** 2D Convolution with 1 input channel, 32 output channels, kernel size of \(3 \times 3\), stride of \(1 \times 1\), and padding of \(1 \times 1\).
- **Layer conv2:** 2D Convolution with 32 input channels, 64 output channels, kernel size of \(3 \times 3\), stride of \(1 \times 1\), and padding of \(1 \times 1\).
- **Pooling Layer (pool):** 2D Max Pooling with kernel size of 2, stride of 2, and no padding (dilation = 1, ceil mode = False).
- **Fully Connected Layer fc1:** Linear layer with 3136 input features and 128 output features (bias enabled).
- **Fully Connected Layer fc2:** Linear layer with 128 input features and 10 output features (bias enabled).
- **Activation Function:** ReLU
- **Dropout Layer:** Dropout with a probability of 0.25 (in-place set to False).

The model was evaluated using cross-validation, resulting in:

- **Mean Accuracy:** 0.991
- **Standard Deviation of Accuracy:** 0.0006

### Task 3:

> Which letters are particularly difficult to classify?

---

**MLP Results:**

<div class="centertable">

| Label | Accuracy |
|-------|----------|
| 0     | 0.990 ± 0.002 |
| 1     | 0.994 ± 0.002 |
| 2     | 0.981 ± 0.005 |
| 3     | 0.974 ± 0.007 |
| 4     | 0.979 ± 0.007 |
| 5     | 0.975 ± 0.007 |
| 6     | 0.985 ± 0.006 |
| 7     | 0.978 ± 0.008 |
| 8     | 0.973 ± 0.007 |
| 9     | 0.968 ± 0.009 |

</div>

**CNN Results:**

<div class="centertable">

| Label | Accuracy |
|-------|----------|
| 0     | 0.998 ± 0.001 |
| 1     | 0.999 ± 0.001 |
| 2     | 0.994 ± 0.002 |
| 3     | 0.994 ± 0.001 |
| 4     | 0.992 ± 0.004 |
| 5     | 0.990 ± 0.003 |
| 6     | 0.989 ± 0.002 |
| 7     | 0.985 ± 0.004 |
| 8     | 0.992 ± 0.001 |
| 9     | 0.981 ± 0.003 |

</div>

After comparing both models, it appears that label **9** is the most challenging to classify accurately.