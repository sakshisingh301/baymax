import google.generativeai as genai

genai.configure(api_key="AIzaSyDXapb_9VUldDxjQ5VbTR71cXHBUM45Un4")

models = genai.list_models()
for model in models:
    print(f"{model.name} — {model.supported_generation_methods}")
