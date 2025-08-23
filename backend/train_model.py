import pandas as pd
from sklearn.linear_model import LinearRegression 
#Imports the LinearRegression class from scikit-learn (sklearn), which is a very popular machine learning library in Python
#Linear regression tries to model the relationship between input variables (features) and a target variable (label) using a straight line (or hyperplane for multiple features).
import joblib #save and reuse the trained model without retraining.

df = pd.read_csv('students.csv') #dia nak load data dari file students.csv

x = df[["hours_studied", "sleep_hours"]] #features (input)
y = df["exam_score"] #target (output)

model = LinearRegression()
model.fit(x, y) #train a very simple regression model that predicts exam_score from hours_studied and sleep_hours

joblib.dump(model, 'student_model.joblib') #save the model to a file
print("Model trained and saved as student_model.joblib")

