from openai import OpenAI
from dotenv import load_dotenv
import os
import json
from ast import literal_eval
load_dotenv(override=True)
openai_key = os.getenv("OPENAI_KEY")
client = OpenAI(api_key=openai_key)

def get_tags(user_input):
    response = client.chat.completions.create(
  model="gpt-4o",
  messages=[
    {
      "role": "system",
      "content": [
        {
          "text": "You are expert in classifying the types of tours that tourists like from the description they write and extract the city they want to visit. \nThe types are :\n - shopping\n - historic_tour\n - art_tour\n - cultural_tour\n - adventure_tour\n - nightlife\n - nature_tour\n - food_tour\n - city_tour\n - museum_tour\n - beach_tour\n\nYou should output only the types of trips from the above list and output the city they want to visit. The output must be a JSON object with the following keys:\ncity: string\ntags: array of strings\nOutput only the JSON object without any markup.",
          "type": "text"
        }
      ]
    },
    {
      "role": "user",
      "content": [
        {
          "text": "I like to view paintings and appreciate statues. As well as go to the club and get wild in berlin.",
          "type": "text"
        }
      ]
    },
    {
      "role": "assistant",
      "content": [
        {
          "text": "{\n  \"city\": \"Berlin\",\n  \"tags\": [\"art_tour\", \"nightlife\"]\n}",
          "type": "text"
        }
      ]
    },
    {
      "role": "user",
      "content": [
        {
          "text": f"{user_input}",
          "type": "text"
        }
      ]
    }
  ],
  temperature=1,
  max_tokens=256,
  top_p=1,
  frequency_penalty=0,
  presence_penalty=0,
response_format={ "type": "json_object" }
)
    tags = []
    try:
        tags = json.loads(response.choices[0].message.content)
        #tags = json.loads(response)
    except Exception as e:
        print(str(e))
    return tags

if __name__ == "__main__":
    print((get_tags("I like muesums and  like to go to rivers")))
