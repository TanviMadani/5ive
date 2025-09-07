require('dotenv').config();
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

// Import models
const User = require('./src/models/User');
const Lesson = require('./src/models/Lesson');
const Flashcard = require('./src/models/Flashcard');
const Quiz = require('./src/models/Quiz');
const Progress = require('./src/models/Progress');

// Connect to MongoDB
const connectDB = async () => {
  try {
    const mongoUri = process.env.MONGODB_URI || 'mongodb://localhost:27017/5ive';
    await mongoose.connect(mongoUri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('✅ Connected to MongoDB');
  } catch (error) {
    console.error('❌ MongoDB connection error:', error);
    process.exit(1);
  }
};

const createSampleData = async () => {
  try {
    console.log('🚀 Starting sample data creation...\n');

    // Create sample users
    console.log('👤 Creating sample users...');
    
    // Create admin user
    let adminUser = await User.findOne({ email: 'admin@5ive.com' });
    if (!adminUser) {
      const hashedPassword = await bcrypt.hash('admin123', 10);
      adminUser = new User({
        name: 'Admin User',
        email: 'admin@5ive.com',
        passwordHash: hashedPassword,
        role: 'admin',
        points: 1000,
        streak: 7
      });
      await adminUser.save();
      console.log('   ✅ Admin user created');
    } else {
      console.log('   ℹ️  Admin user already exists');
    }

    // Create test user
    let testUser = await User.findOne({ email: 'user@test.com' });
    if (!testUser) {
      const hashedPassword = await bcrypt.hash('password123', 10);
      testUser = new User({
        name: 'Test User',
        email: 'user@test.com',
        passwordHash: hashedPassword,
        role: 'user',
        interests: ['AI', 'Technology', 'Programming'],
        jobRole: 'Software Developer',
        points: 500,
        streak: 3
      });
      await testUser.save();
      console.log('   ✅ Test user created');
    } else {
      console.log('   ℹ️  Test user already exists');
    }

    // Create sample lessons
    console.log('\n📚 Creating sample lessons...');
    const lessonCount = await Lesson.countDocuments();
    if (lessonCount === 0) {
      const sampleLessons = [
        {
          title: 'Introduction to Artificial Intelligence',
          content: `# Introduction to Artificial Intelligence

## What is AI?
Artificial Intelligence (AI) refers to the simulation of human intelligence in machines that are programmed to think and learn like humans. The term may also be applied to any machine that exhibits traits associated with a human mind such as learning and problem-solving.

## Key Concepts:
- **Machine Learning**: The ability of machines to learn without being explicitly programmed
- **Deep Learning**: A subset of ML using neural networks with multiple layers
- **Natural Language Processing**: AI's ability to understand and generate human language
- **Computer Vision**: AI's capability to interpret and make decisions based on visual data

## Applications:
- Virtual assistants (Siri, Alexa)
- Recommendation systems (Netflix, Amazon)
- Autonomous vehicles
- Medical diagnosis
- Financial fraud detection

## The Future of AI:
AI is rapidly evolving and will continue to transform industries, create new job opportunities, and solve complex global challenges.`,
          tags: ['AI', 'Technology', 'Introduction'],
          createdBy: adminUser._id
        },
        {
          title: 'Machine Learning Fundamentals',
          content: `# Machine Learning Fundamentals

## What is Machine Learning?
Machine Learning is a subset of AI that enables computers to learn and improve from experience without being explicitly programmed.

## Types of Machine Learning:

### 1. Supervised Learning
- Uses labeled training data
- Examples: Classification, Regression
- Algorithms: Linear Regression, Decision Trees, SVM

### 2. Unsupervised Learning
- Works with unlabeled data
- Examples: Clustering, Association
- Algorithms: K-Means, Hierarchical Clustering

### 3. Reinforcement Learning
- Learns through interaction with environment
- Uses rewards and penalties
- Examples: Game playing, Robotics

## Popular Algorithms:
- **Linear Regression**: Predicts continuous values
- **Decision Trees**: Easy to interpret, handles both numerical and categorical data
- **Neural Networks**: Inspired by human brain, powerful for complex patterns
- **Random Forest**: Combines multiple decision trees
- **Support Vector Machines**: Effective for classification tasks

## Getting Started:
1. Learn Python programming
2. Understand statistics and mathematics
3. Practice with datasets
4. Use libraries like scikit-learn, TensorFlow, PyTorch`,
          tags: ['Machine Learning', 'AI', 'Algorithms'],
          createdBy: adminUser._id
        },
        {
          title: 'Deep Learning and Neural Networks',
          content: `# Deep Learning and Neural Networks

## What is Deep Learning?
Deep Learning is a subset of machine learning that uses neural networks with multiple layers (deep neural networks) to model and understand complex patterns in data.

## Neural Network Basics:
- **Neurons**: Basic processing units that receive inputs and produce outputs
- **Layers**: Collections of neurons (Input, Hidden, Output layers)
- **Weights and Biases**: Parameters that the network learns during training
- **Activation Functions**: Determine if a neuron should be activated

## Types of Neural Networks:

### 1. Feedforward Neural Networks
- Information flows in one direction
- Good for: Basic classification and regression

### 2. Convolutional Neural Networks (CNNs)
- Specialized for image processing
- Uses convolution operations
- Applications: Image recognition, computer vision

### 3. Recurrent Neural Networks (RNNs)
- Can process sequences of data
- Has memory capabilities
- Applications: Natural language processing, time series

### 4. Long Short-Term Memory (LSTM)
- Special type of RNN
- Solves vanishing gradient problem
- Better at learning long-term dependencies

## Popular Frameworks:
- **TensorFlow**: Google's open-source framework
- **PyTorch**: Facebook's dynamic neural network framework
- **Keras**: High-level API for TensorFlow
- **JAX**: Google's library for high-performance ML research

## Applications:
- Image and speech recognition
- Natural language translation
- Autonomous vehicles
- Medical diagnosis
- Game playing (AlphaGo, Chess)`,
          tags: ['Deep Learning', 'Neural Networks', 'AI'],
          createdBy: adminUser._id
        },
        {
          title: 'Natural Language Processing (NLP)',
          content: `# Natural Language Processing (NLP)

## What is NLP?
Natural Language Processing is a branch of AI that helps computers understand, interpret, and manipulate human language.

## Key NLP Tasks:

### 1. Text Preprocessing
- **Tokenization**: Breaking text into words or sentences
- **Stemming/Lemmatization**: Reducing words to root forms
- **Stop Words Removal**: Removing common words (the, is, at)
- **Part-of-Speech Tagging**: Identifying grammatical roles

### 2. Text Analysis
- **Sentiment Analysis**: Determining emotional tone
- **Named Entity Recognition**: Identifying people, places, organizations
- **Topic Modeling**: Discovering topics in text collections
- **Text Classification**: Categorizing text into predefined classes

### 3. Language Generation
- **Text Summarization**: Creating concise summaries
- **Machine Translation**: Converting text between languages
- **Chatbots**: Conversational AI systems
- **Content Generation**: Creating human-like text

## Modern NLP Approaches:

### Traditional Methods:
- Bag of Words
- TF-IDF (Term Frequency-Inverse Document Frequency)
- N-grams

### Deep Learning Methods:
- **Word Embeddings**: Word2Vec, GloVe
- **Sequence Models**: RNNs, LSTMs, GRUs
- **Attention Mechanisms**: Focus on relevant parts of input
- **Transformers**: BERT, GPT, T5

## Popular Libraries:
- **NLTK**: Natural Language Toolkit
- **spaCy**: Industrial-strength NLP
- **Transformers**: Hugging Face library
- **Gensim**: Topic modeling and document similarity

## Applications:
- Search engines
- Virtual assistants
- Language translation
- Content moderation
- Document analysis
- Customer service automation`,
          tags: ['NLP', 'Natural Language Processing', 'AI'],
          createdBy: adminUser._id
        },
        {
          title: 'Computer Vision Fundamentals',
          content: `# Computer Vision Fundamentals

## What is Computer Vision?
Computer Vision is a field of AI that trains computers to interpret and understand visual information from the world, including images and videos.

## Core Concepts:

### Image Representation:
- **Pixels**: Basic building blocks of digital images
- **RGB Channels**: Red, Green, Blue color components
- **Grayscale**: Single intensity value per pixel
- **Image Resolution**: Width × Height in pixels

### Image Processing Techniques:
- **Filtering**: Noise reduction, edge detection
- **Morphological Operations**: Erosion, dilation
- **Histogram Equalization**: Improving contrast
- **Image Segmentation**: Dividing image into regions

## Computer Vision Tasks:

### 1. Image Classification
- Assigning labels to entire images
- Example: Cat vs Dog classifier
- Metrics: Accuracy, Precision, Recall

### 2. Object Detection
- Finding and locating objects in images
- Output: Bounding boxes + class labels
- Algorithms: YOLO, R-CNN, SSD

### 3. Image Segmentation
- **Semantic**: Pixel-level classification
- **Instance**: Separating individual objects
- Applications: Medical imaging, autonomous driving

### 4. Face Recognition
- Identifying individuals from facial features
- Steps: Detection → Alignment → Recognition
- Applications: Security, photo tagging

## Deep Learning in Computer Vision:

### Convolutional Neural Networks (CNNs):
- **Convolution Layers**: Feature extraction
- **Pooling Layers**: Dimensionality reduction
- **Fully Connected Layers**: Final classification

### Popular CNN Architectures:
- **LeNet**: Early CNN for digit recognition
- **AlexNet**: Breakthrough in image classification
- **VGG**: Very deep networks with small filters
- **ResNet**: Residual connections for very deep networks
- **EfficientNet**: Optimized for accuracy and efficiency

## Tools and Libraries:
- **OpenCV**: Computer vision library
- **PIL/Pillow**: Python imaging library
- **scikit-image**: Image processing in Python
- **TensorFlow/Keras**: Deep learning frameworks
- **PyTorch**: Dynamic neural networks

## Applications:
- Medical image analysis
- Autonomous vehicles
- Quality control in manufacturing
- Augmented reality
- Sports analysis
- Satellite imagery analysis`,
          tags: ['Computer Vision', 'Image Processing', 'AI'],
          createdBy: adminUser._id
        }
      ];

      await Lesson.insertMany(sampleLessons);
      console.log(`   ✅ Created ${sampleLessons.length} sample lessons`);
    } else {
      console.log(`   ℹ️  Found ${lessonCount} existing lessons`);
    }

    // Get all lessons for creating flashcards
    const lessons = await Lesson.find();

    // Create sample flashcards
    console.log('\n🃏 Creating sample flashcards...');
    const flashcardCount = await Flashcard.countDocuments();
    if (flashcardCount === 0) {
      const sampleFlashcards = [
        // AI Introduction flashcards
        {
          lessonId: lessons[0]._id,
          question: 'What does AI stand for?',
          answer: 'Artificial Intelligence',
          createdBy: adminUser._id
        },
        {
          lessonId: lessons[0]._id,
          question: 'What is Machine Learning?',
          answer: 'The ability of machines to learn without being explicitly programmed',
          createdBy: adminUser._id
        },
        {
          lessonId: lessons[0]._id,
          question: 'Name three applications of AI mentioned in the lesson.',
          answer: 'Virtual assistants (Siri, Alexa), Recommendation systems (Netflix, Amazon), Autonomous vehicles',
          createdBy: adminUser._id
        },
        
        // Machine Learning flashcards
        {
          lessonId: lessons[1]._id,
          question: 'What are the three main types of Machine Learning?',
          answer: 'Supervised Learning, Unsupervised Learning, and Reinforcement Learning',
          createdBy: adminUser._id
        },
        {
          lessonId: lessons[1]._id,
          question: 'Which type of learning uses labeled training data?',
          answer: 'Supervised Learning',
          createdBy: adminUser._id
        },
        {
          lessonId: lessons[1]._id,
          question: 'What is Reinforcement Learning?',
          answer: 'Learning through interaction with environment using rewards and penalties',
          createdBy: adminUser._id
        },
        
        // Deep Learning flashcards
        {
          lessonId: lessons[2]._id,
          question: 'What are the basic components of a neural network?',
          answer: 'Neurons, Layers, Weights and Biases, and Activation Functions',
          createdBy: adminUser._id
        },
        {
          lessonId: lessons[2]._id,
          question: 'What type of neural network is specialized for image processing?',
          answer: 'Convolutional Neural Networks (CNNs)',
          createdBy: adminUser._id
        },
        {
          lessonId: lessons[2]._id,
          question: 'What problem does LSTM solve in RNNs?',
          answer: 'The vanishing gradient problem and helps learn long-term dependencies',
          createdBy: adminUser._id
        },
        
        // NLP flashcards
        {
          lessonId: lessons[3]._id,
          question: 'What does NLP stand for?',
          answer: 'Natural Language Processing',
          createdBy: adminUser._id
        },
        {
          lessonId: lessons[3]._id,
          question: 'What is tokenization in NLP?',
          answer: 'Breaking text into words or sentences',
          createdBy: adminUser._id
        },
        {
          lessonId: lessons[3]._id,
          question: 'Name two popular NLP libraries.',
          answer: 'NLTK and spaCy',
          createdBy: adminUser._id
        },
        
        // Computer Vision flashcards
        {
          lessonId: lessons[4]._id,
          question: 'What are the three color components in RGB?',
          answer: 'Red, Green, and Blue',
          createdBy: adminUser._id
        },
        {
          lessonId: lessons[4]._id,
          question: 'What is the difference between semantic and instance segmentation?',
          answer: 'Semantic segmentation classifies pixels by category, while instance segmentation separates individual objects',
          createdBy: adminUser._id
        },
        {
          lessonId: lessons[4]._id,
          question: 'What does CNN stand for?',
          answer: 'Convolutional Neural Network',
          createdBy: adminUser._id
        }
      ];

      await Flashcard.insertMany(sampleFlashcards);
      console.log(`   ✅ Created ${sampleFlashcards.length} sample flashcards`);
    } else {
      console.log(`   ℹ️  Found ${flashcardCount} existing flashcards`);
    }

    // Create sample quizzes
    console.log('\n📝 Creating sample quizzes...');
    const quizCount = await Quiz.countDocuments();
    if (quizCount === 0) {
      const sampleQuizzes = [
        {
          title: 'AI Fundamentals Quiz',
          description: 'Test your knowledge of basic AI concepts',
          difficulty: 'Beginner',
          duration: 10,
          questions: [
            {
              text: 'What is the main goal of Artificial Intelligence?',
              options: [
                { text: 'To replace humans completely', isCorrect: false },
                { text: 'To simulate human intelligence in machines', isCorrect: true },
                { text: 'To make computers faster', isCorrect: false },
                { text: 'To create robots', isCorrect: false }
              ],
              explanation: 'AI aims to create machines that can think and learn like humans, not necessarily to replace them.'
            },
            {
              text: 'Which of the following is NOT a type of Machine Learning?',
              options: [
                { text: 'Supervised Learning', isCorrect: false },
                { text: 'Unsupervised Learning', isCorrect: false },
                { text: 'Reinforcement Learning', isCorrect: false },
                { text: 'Deterministic Learning', isCorrect: true }
              ],
              explanation: 'The three main types of ML are Supervised, Unsupervised, and Reinforcement Learning.'
            },
            {
              text: 'What does NLP stand for?',
              options: [
                { text: 'Natural Language Programming', isCorrect: false },
                { text: 'Neural Language Processing', isCorrect: false },
                { text: 'Natural Language Processing', isCorrect: true },
                { text: 'New Language Protocol', isCorrect: false }
              ],
              explanation: 'NLP stands for Natural Language Processing, which helps computers understand human language.'
            }
          ],
          createdBy: adminUser._id
        },
        {
          title: 'Machine Learning Quiz',
          description: 'Advanced quiz on machine learning concepts',
          difficulty: 'Intermediate',
          duration: 15,
          questions: [
            {
              text: 'In supervised learning, what is required in the training data?',
              options: [
                { text: 'Only input features', isCorrect: false },
                { text: 'Only output labels', isCorrect: false },
                { text: 'Both input features and output labels', isCorrect: true },
                { text: 'Neither inputs nor outputs', isCorrect: false }
              ],
              explanation: 'Supervised learning requires labeled data with both input features and corresponding output labels.'
            },
            {
              text: 'Which algorithm is best for image recognition tasks?',
              options: [
                { text: 'Linear Regression', isCorrect: false },
                { text: 'Decision Trees', isCorrect: false },
                { text: 'Convolutional Neural Networks', isCorrect: true },
                { text: 'K-Means Clustering', isCorrect: false }
              ],
              explanation: 'CNNs are specifically designed for image processing and recognition tasks.'
            },
            {
              text: 'What is overfitting in machine learning?',
              options: [
                { text: 'When a model performs well on both training and test data', isCorrect: false },
                { text: 'When a model performs well on training data but poorly on new data', isCorrect: true },
                { text: 'When a model performs poorly on training data', isCorrect: false },
                { text: 'When a model is too simple', isCorrect: false }
              ],
              explanation: 'Overfitting occurs when a model learns the training data too well and fails to generalize to new data.'
            }
          ],
          createdBy: adminUser._id
        }
      ];

      await Quiz.insertMany(sampleQuizzes);
      console.log(`   ✅ Created ${sampleQuizzes.length} sample quizzes`);
    } else {
      console.log(`   ℹ️  Found ${quizCount} existing quizzes`);
    }

    // Create sample progress data
    console.log('\n📊 Creating sample progress data...');
    const progressCount = await Progress.countDocuments();
    if (progressCount === 0) {
      const sampleProgress = [
        {
          userId: testUser._id,
          lessonId: lessons[0]._id,
          completed: true,
          completedAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000), // 2 days ago
          score: 85
        },
        {
          userId: testUser._id,
          lessonId: lessons[1]._id,
          completed: true,
          completedAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000), // 1 day ago
          score: 92
        },
        {
          userId: testUser._id,
          lessonId: lessons[2]._id,
          completed: false,
          score: 0
        }
      ];

      await Progress.insertMany(sampleProgress);
      console.log(`   ✅ Created ${sampleProgress.length} sample progress records`);
    } else {
      console.log(`   ℹ️  Found ${progressCount} existing progress records`);
    }

    console.log('\n🎉 Sample data creation completed successfully!\n');
    
    // Summary
    const finalCounts = {
      users: await User.countDocuments(),
      lessons: await Lesson.countDocuments(),
      flashcards: await Flashcard.countDocuments(),
      quizzes: await Quiz.countDocuments(),
      progress: await Progress.countDocuments()
    };

    console.log('📊 Database Summary:');
    console.log(`   👤 Users: ${finalCounts.users}`);
    console.log(`   📚 Lessons: ${finalCounts.lessons}`);
    console.log(`   🃏 Flashcards: ${finalCounts.flashcards}`);
    console.log(`   📝 Quizzes: ${finalCounts.quizzes}`);
    console.log(`   📊 Progress Records: ${finalCounts.progress}`);

    console.log('\n🔑 Test Credentials:');
    console.log('   Admin: admin@5ive.com / admin123');
    console.log('   User:  user@test.com / password123');

  } catch (error) {
    console.error('❌ Error creating sample data:', error);
  } finally {
    await mongoose.connection.close();
    console.log('\n✅ Database connection closed');
    process.exit(0);
  }
};

// Run the script
const main = async () => {
  await connectDB();
  await createSampleData();
};

main().catch(console.error);
