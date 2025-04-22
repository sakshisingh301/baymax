import google.generativeai as genai

genai.configure(api_key="")

models = genai.list_models()
for model in models:
    print(f"{model.name} — {model.supported_generation_methods}")
