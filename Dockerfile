FROM mcr.microsoft.com/azureml/openmpi4.1.0-ubuntu20.04
RUN pip install azureml-inference-server-http \ 
    azureml-mlflow \
    scikit-learn \
    opencv-python \
    numpy \
    joblib \
    mediapipe \
    bytesbufio \
    requests \
    azureml-defaults \
    azure-storage-blob \
    azure-identity \
    virtualenv

# Install system dependencies
RUN apt-get update && apt-get install -y \
    libgl1-mesa-glx \
    libsm6 \
    libxext6 \
    ffmpeg \
    && rm -rf /var/lib/apt/lists/*

# This Dockerfile is for custom environment for Azure ML