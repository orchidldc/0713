## Big Data HW11: MNIST Autoencoder

LI Dacheng (12431477)

**Data Preprocessing**

We normalized both the training and testing datasets using $\mu$ and $\sigma$ derived from the training set.

- **Mean:** 0.1307
- **Standard Deviation:** 0.3081

We split the training dataset into a training and validation set using a 80-20 ratio, in order to monitor the model's performance during training.

Visualizing the distribution of labels in the training dataset, we observed that the distribution is relatively balanced, with each label accounting for approximately 10% of the dataset.

<div align="center">

<img src="https://github.com/ligang19999/images/blob/main/big_data/hw11/task0.png?raw=true" width=75% alt="">
</div>

### Task 1:

> Build an auto-encoder with just an MLP architecture and a two-dimensional embedding layer. Finally, plot a random subset of 1000 images in the two-dimensional embedding plane.

---

**MLP Autoencoder Architecture:**

```python{.line-numbers}
    self.encoder = nn.Sequential(
        nn.Linear(input_dim, 128),
        nn.ReLU(),
        nn.Linear(128, 64),
        nn.ReLU(),
        nn.Linear(64, encoding_dim)
    )
    self.decoder = nn.Sequential(
        nn.Linear(encoding_dim, 64),
        nn.ReLU(),
        nn.Linear(64, 128),
        nn.ReLU(),
        nn.Linear(128, input_dim),
        nn.Sigmoid()
    )
```

We train the model in 100 epochs, when the validation loss does not improve (decrease) for 10 epochs, we think the model has converged and stop training.

> [!NOTE|label:NOTE]
> - The model stops in 100 epochs, while the loss didn't improve too much after 50 epochs.
> - Actually, the model can converge in about 130 epochs, it makes no much difference in the final result.

1. 1000 random samples from test dataset:

    <br>

    <div align="center">

    <img src="https://github.com/ligang19999/images/blob/main/big_data/hw11/task1_1000.png?raw=true" width=75% alt="">
    </div>
    <br>

    - The MLP autoencoder successfully captures the main characteristics of the digits, allowing most digits to form separable clusters in the 2D embedding space.
    - Distinct digits like `0`, `1`, `2` are well represented, with compact and clear clusters.
    - The overlap between certain digits (e.g., `4` and `8`, `5` and `3`) suggests that the model struggles to capture fine-grained differences between similar-looking digits.

2. All test images:

    <br>

    <div align="center">

    <img src="https://github.com/ligang19999/images/blob/main/big_data/hw11/task1_test.png?raw=true" width=75% alt="">
    </div>
    <br>

    - Consistent with the random sample, the full test dataset shows more clustered representations for distinct digits like `0` and `1`
    - More overlaps: `6` and `8`

### Task 2:

> Do the same as in Task 1 but use a CNN instead of an MLP architecture. Compare your performance relative to the one from Task 1 on a test set.

---

**CNN Architecture:**

```python{.line-numbers}
    self.encoder = nn.Sequential(
        nn.Conv2d(1, 32, kernel_size=3, stride=1, padding=1),
        nn.ReLU(),
        nn.MaxPool2d(2),
        nn.Conv2d(32, 64, kernel_size=3, stride=1, padding=1),
        nn.ReLU(),
        nn.MaxPool2d(2)
    )
    self.fc1 = nn.Linear(7 * 7 * 64, encoding_dim)
    self.fc2 = nn.Linear(encoding_dim, 7 * 7 * 64)
    self.decoder = nn.Sequential(
        nn.ConvTranspose2d(64, 32, kernel_size=3, stride=2, padding=1, output_padding=1),
        nn.ReLU(),
        nn.ConvTranspose2d(32, 1, kernel_size=3, stride=2, padding=1, output_padding=1),
        nn.Sigmoid()
    )
```

<font size=5><b>Encoder:</b></font>

- **Layer conv1:** 2D Convolution with 1 input channel, 32 output channels, kernel size of \(3 \times 3\), stride of \(1 \times 1\), and padding of \(1 \times 1\).
- **ReLU Activation Function:** add some non-linearity
- **Pooling Layer (pool):** 2D Max Pooling with kernel size of 2
- **Layer conv2:** 2D Convolution with 32 input channels, 64 output channels, kernel size of \(3 \times 3\), stride of \(1 \times 1\), and padding of \(1 \times 1\).
- $\cdots$
- **Fully Connected Layer fc1:** Linear layer with 3136 ($64 \times 7 \times 7$) input features and 2 output features

<font size=5><b>Decoder:</b></font>

- **Fully Connected Layer fc2:** Linear layer with 2 input features and 3136 output features
- **Convolutional Transpose Layer:** 2D Convolutional Transpose with 64 input channels, 32 output channels, kernel size of \(3 \times 3\), stride of 2, padding of 1, and output padding of 1.
- **ReLU Activation Function:** add some non-linearity
- **Convolutional Transpose Layer:** 2D Convolutional Transpose with 32 input channels, 1 output channel, kernel size of \(3 \times 3\), stride of 2, padding of 1, and output padding of 1.
- **Sigmoid Activation Function:** ensure output values are between 0 and 1

Comparing the MLP and CNN autoencoders:

1. 1000 random samples from test dataset:

    <br>
    <div align="center">

    <img src="https://github.com/ligang19999/images/blob/main/big_data/hw11/task2_1000.png?raw=true" width=75% alt="">
    </div>
    <br>

    - The CNN autoencoder underperforms the MLP autoencoder in terms of the reconstruction loss on the test set:
    - less distinct clusters for different digits
    - more overlap between digits, especially for `0` and `2`

2. All test images:

    <br>
    <div align="center">

    <img src="https://github.com/ligang19999/images/blob/main/big_data/hw11/task2_test.png?raw=true" width=75% alt="">
    </div>

### Task 3:

> Measure the cosine distance between different pairs of digits in the embedding space of the CNN autoencoder. Which digits are furthest apart? Which ones are closest?

---

Average each digit's embedding vectors and calculate the cosine distance between each pair of digits.

Furthest digits: (1, 0), Distance: 1.7452<br>
Closest digits: (9, 4), Distance: 0.0011

### Task 4:

> Repeat task 2 but vary the embedding dimension. How does your test error scale as a function thereof?

---

<div align="center">

<img src="https://github.com/ligang19999/images/blob/main/big_data/hw11/task4.png?raw=true" width=75% alt="">
</div>

As we can see from the test loss vs embedding dimension plot, the test loss decreases as the embedding dimension increases. This is expected as a higher-dimensional embedding space can capture more information about the input data, leading to better reconstruction performance.

## Appendix: Code Implementation

```python {.line-numbers}
    import matplotlib.pyplot as plt
    import numpy as np
    import torch
    import torch.nn as nn
    import torch.optim as optim
    from sklearn.metrics.pairwise import cosine_distances
    from torch.utils.data import DataLoader, random_split
    from torchvision import datasets, transforms

    # Define Transformations
    transform = transforms.Compose([transforms.ToTensor()])
    train_dataset = datasets.MNIST(root="./data",
                                train=True,
                                download=True,
                                transform=transform)

    train_loader = DataLoader(train_dataset, batch_size=60000, shuffle=False)
    images, _ = next(iter(train_loader))
    mean = images.mean().item()
    std = images.std().item()

    # Redefine
    transform = transforms.Compose(
        [transforms.ToTensor(),
        transforms.Normalize((mean), (std))])

    # Load Datasets
    full_train_dataset = datasets.MNIST(root="./data",
                                        train=True,
                                        download=True,
                                        transform=transform)
    train_size = int(0.8 * len(full_train_dataset))
    val_size = len(full_train_dataset) - train_size
    torch.manual_seed(42)
    train_dataset, val_dataset = random_split(full_train_dataset,
                                            [train_size, val_size])

    train_loader = DataLoader(train_dataset, batch_size=256, shuffle=True)
    val_loader = DataLoader(val_dataset, batch_size=256, shuffle=False)
    test_dataset = datasets.MNIST(root="./data",
                                train=False,
                                download=True,
                                transform=transform)
    test_loader = DataLoader(test_dataset, batch_size=256, shuffle=False)
```

```python {.line-numbers}
    # Define MLP Autoencoder
    class MLP_Autoencoder(nn.Module):

        def __init__(self, input_dim, encoding_dim):
            super(MLP_Autoencoder, self).__init__()
            self.encoder = nn.Sequential(nn.Linear(input_dim, 128), nn.ReLU(),
                                        nn.Linear(128, 64), nn.ReLU(),
                                        nn.Linear(64, encoding_dim))
            self.decoder = nn.Sequential(nn.Linear(encoding_dim, 64), nn.ReLU(),
                                        nn.Linear(64, 128), nn.ReLU(),
                                        nn.Linear(128, input_dim), nn.Sigmoid())

        def forward(self, x):
            encoded = self.encoder(x)
            decoded = self.decoder(encoded)
            return encoded, decoded
```

```python {.line-numbers}
    # Define CNN Autoencoder
    class CNN_Autoencoder(nn.Module):

        def __init__(self, encoding_dim):
            super(CNN_Autoencoder, self).__init__()
            self.encoder = nn.Sequential(nn.Conv2d(1, 32, 3, 1, 1), nn.ReLU(),
                                        nn.MaxPool2d(2),
                                        nn.Conv2d(32, 64, 3, 1, 1), nn.ReLU(),
                                        nn.MaxPool2d(2))
            self.fc1 = nn.Linear(7 * 7 * 64, encoding_dim)
            self.fc2 = nn.Linear(encoding_dim, 7 * 7 * 64)
            self.decoder = nn.Sequential(nn.ConvTranspose2d(64, 32, 3, 2, 1, 1),
                                        nn.ReLU(),
                                        nn.ConvTranspose2d(32, 1, 3, 2, 1, 1),
                                        nn.Sigmoid())

        def forward(self, x):
            x = self.encoder(x).view(x.size(0), -1)
            encoded = self.fc1(x)
            x = self.fc2(encoded).view(x.size(0), 64, 7, 7)
            decoded = self.decoder(x)
            return encoded, decoded
```

```python {.line-numbers}
    # Training Function with Early Stopping
    def train_autoencoder(model, train_loader, val_loader, epochs,
                        early_stop_patience):
        criterion = nn.MSELoss()
        optimizer = optim.Adam(model.parameters(), lr=0.001)
        best_val_loss = float("inf")
        early_stop_counter = 0

        for epoch in range(epochs):
            # Training loop
            model.train()
            train_loss = 0
            for data, _ in train_loader:
                data = data.view(data.size(0), -1) if isinstance(
                    model, MLP_Autoencoder) else data
                _, output = model(data)
                loss = criterion(output, data)
                optimizer.zero_grad()
                loss.backward()
                optimizer.step()
                train_loss += loss.item()
            train_loss /= len(train_loader)

            # Validation loop
            model.eval()
            val_loss = 0
            with torch.no_grad():
                for data, _ in val_loader:
                    data = data.view(data.size(0), -1) if isinstance(
                        model, MLP_Autoencoder) else data
                    _, output = model(data)
                    val_loss += criterion(output, data).item()
            val_loss /= len(val_loader)

            print(
                f"Epoch [{epoch+1}/{epochs}]: Train Loss = {train_loss:.4f}, Val Loss = {val_loss:.4f}"
            )

            if val_loss < best_val_loss:
                best_val_loss = val_loss
                early_stop_counter = 0
            else:
                early_stop_counter += 1
                print(
                    f"Validation loss did not improve. Counter: {early_stop_counter}/{early_stop_patience}"
                )

            if early_stop_counter >= early_stop_patience:
                print("Early stopping triggered. Training terminated.")
                break
```

### Task 1

```python {.line-numbers}
    # Train and Evaluate Models
    input_dim = 28 * 28
    encoding_dim = 2

    # Train MLP Autoencoder
    mlp_model = MLP_Autoencoder(input_dim, encoding_dim)
    train_autoencoder(mlp_model,
                    train_loader,
                    val_loader,
                    epochs=100,
                    early_stop_patience=10)
```

### Task 2

```python {.line-numbers}
    # Train CNN Autoencoder
    cnn_model = CNN_Autoencoder(encoding_dim)
    train_autoencoder(cnn_model,
                    train_loader,
                    val_loader,
                    epochs=100,
                    early_stop_patience=10)
```

```python {.line-numbers}
    # Visualization of 2D Embeddings
    def visualize_embeddings(model,
                            test_loader,
                            title,
                            filename,
                            sample_size=None):
        model.eval()
        embeddings, labels = [], []
        with torch.no_grad():
            for data, label in test_loader:
                data = data.view(data.size(0), -1) if isinstance(
                    model, MLP_Autoencoder) else data
                encoded, _ = model(data)
                embeddings.append(encoded)
                labels.append(label)
        embeddings = torch.cat(embeddings).numpy()
        labels = torch.cat(labels).numpy()

        if sample_size:
            np.random.seed(42)
            indices = np.random.choice(len(labels), sample_size, replace=False)
            embeddings = embeddings[indices]
            labels = labels[indices]

        plt.scatter(embeddings[:, 0],
                    embeddings[:, 1],
                    c=labels,
                    cmap="tab10",
                    alpha=0.5)
        plt.colorbar(label="Digit Label")
        plt.title(title)
        plt.xlabel("Embedding Dimension 1")
        plt.ylabel("Embedding Dimension 2")
        plt.savefig(filename)
        plt.show()


    # Visualize MLP and CNN embeddings
    visualize_embeddings(mlp_model, test_loader,
                        "2D Embedding of All Test MNIST (MLP)", "mlp_test.png")
    visualize_embeddings(cnn_model, test_loader,
                        "2D Embedding of All Test MNIST (CNN)", "cnn_test.png")
    visualize_embeddings(cnn_model,
                        test_loader,
                        "2D Embedding of Random 1000 MNIST Images (CNN)",
                        "cnn_1000.png",
                        sample_size=1000)
```

### Task 3

```python {.line-numbers}
    # Cosine Distance Calculation
    def cosine_distance_matrix(embeddings, labels):
        unique_digits = np.unique(labels)
        avg_embeddings = {
            digit: embeddings[labels == digit].mean(axis=0)
            for digit in unique_digits
        }
        distances = {
            (d1, d2):
            cosine_distances(avg_embeddings[d1].reshape(1, -1),
                            avg_embeddings[d2].reshape(1, -1))[0][0]
            for d1 in unique_digits
            for d2 in unique_digits if d2 < d1
        }
        return distances


    distances = cosine_distance_matrix(embeddings, labels)
    furthest = max(distances, key=distances.get)
    closest = min(distances, key=distances.get)
    print(f"Furthest digits: {furthest}, Distance: {distances[furthest]:.4f}")
    print(f"Closest digits: {closest}, Distance: {distances[closest]:.4f}")
```

### Task 4

```python {.line-numbers}
    # Embedding Dimension vs. Test Loss Analysis
    embedding_dims = [2, 8, 16, 32, 64]
    test_losses = []

    for dim in embedding_dims:
        model = CNN_Autoencoder(dim)
        optimizer = optim.Adam(model.parameters(), lr=0.001)
        for epoch in range(10):  # Train for fewer epochs
            for data, _ in train_loader:
                data = data.view(-1, 1, 28, 28)
                _, output = model(data)
                loss = criterion(output, data)
                optimizer.zero_grad()
                loss.backward()
                optimizer.step()

        # Calculate test loss
        model.eval()
        test_loss = 0
        with torch.no_grad():
            for data, _ in test_loader:
                data = data.view(-1, 1, 28, 28)
                _, output = model(data)
                test_loss += criterion(output, data).item()
        test_losses.append(test_loss / len(test_loader))
        print(
            f"Embedding dimension: {dim}, Test loss: {test_loss / len(test_loader):.4f}"
        )

    plt.plot(embedding_dims, test_losses, marker='o')
    plt.xlabel("Embedding Dimension")
    plt.ylabel("Test Loss")
    plt.title("Test Loss vs Embedding Dimension")
    plt.show()
```