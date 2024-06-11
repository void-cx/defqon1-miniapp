<template>
  <section class="m-2">
    <h1 class="text-3xl text-center defqon">Questions & Answers</h1>
    <div
      v-for="(faqCategory, categoryIndex) of faq"
      :key="faqCategory.title"
      class="collapse collapse-arrow join-item "
    >
      <input type="radio" name="faq-category" /> 
      <div class="collapse-title text-2xl font-medium defqon">
        {{ faqCategory.title }}
      </div>
      <div class="collapse-content"> 
        <div class="join join-vertical w-full">
          <div
            v-for="(entry, index) of faqCategory.entries"
            :key="index"
            class="collapse collapse-arrow join-item border border-base-300"
          >
            <input type="radio" :name="`faq-entry-${categoryIndex}`" /> 
            <div class="collapse-title text-xl font-medium">
              {{ entry.question}}
            </div>
            <div class="collapse-content"> 
              <p v-html="entry.answer"></p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
const faq = [
  {
    'title': 'Tokens & Recycling Tokens',
    'entries': [
      {
        'question': 'What are tokens used for?',
        'answer': 'Tokens are mainly used for purchasing food and drinks at the festival.'
      },
      {
        'question': 'What is the cost of drinks?',
        'answer': '<table><tr><th>Product<th>Price<tr><td><strong>Cup / Can / Bottle (Pfand)</strong><td>½ tokens<tr><td><strong>Heineken (0.2l)</strong><td>1 token<tr><td><strong>Heineken (0.0%, 0.2l)</strong><td>1 token<tr><td><strong>Coca Cola (Regular / Zero)</strong><td>1 token<tr><td><strong>Fanta Orange</strong><td>1 token<tr><td><strong>Sprite</strong><td>1 token<tr><td><strong>Flügel (Buy 9 Get 10)</strong><td>1 token<tr><td><strong>Desperados Original</strong><td>1½ tokens<tr><td><strong>Apple Bandit (Cider)</strong><td>1½ tokens<tr><td><strong>STELZ Hard Seltzer</strong><td>1½ tokens<tr><td><strong>Chaudfontaine Water (Still / Lemon)</strong><td>1½ tokens<tr><td><strong>Aquarius (like Powerade)</strong><td>1½ tokens<tr><td><strong>Fuze Tea (Green Mango / Black Peach)</strong><td>1½ tokens<tr><td><strong>Red Bull (Regular / Sugar Free)</strong><td>1½ tokens<tr><td><strong>White Wine</strong><td>1½ tokens<tr><td><strong>Alpine Earplugs</strong><td>1½ tokens<tr><td><strong>Heineken Large (0.5l)</strong><td>2 tokens<tr><td><strong>Captain Morgan Rum & Cola</strong><td>2½ tokens<tr><td><strong>Gordons Gin & Tonic</strong><td>2½ tokens<tr><td><strong>Smirnoff Ice</strong><td>2½ tokens<tr><td><strong>J&B Whisky & Cola</strong><td>2½ tokens<tr><td><strong>Smirnoff Vodka & Red Bull</strong><td>2½ tokens</table>'
      },
      {
        'question': 'What is the cost of food?',
        'answer': 'Food generally starts from 2 tokens for croque-monsieur and goes up to a maximum of 4 tokens for pizzas.'
      },
      {
        'question': 'Are tokens used for anything else?',
        'answer': 'Tokens can also be used for hot showers. In 2023, these cost 1 token.'
      },
      {
        'question': 'Should I keep tokens as a souvenir?',
        'answer': 'Many attendees keep at least one token as a souvenir, but manage them wisely if you don\'t want to start a plastic collection, as tokens aren\'t refundable and won\'t carry over to the next year.'
      },
      {
        'question': 'How do I get tokens?',
        'answer': 'Tokens are available throughout the festival, including the campsite, village, and inside the festival grounds.'
      },
      {
        'question': 'What are the prices of tokens?',
        'answer': '<ul><li>2022: €3.60 per token</li><li>2023: €3.80 per token</li><li>2024: Estimated €4.00 per token</li></ul>'
      },
      {
        'question': 'How can I purchase tokens?',
        'answer': 'Tokens can be purchased using credit cards or cash. It\'s advisable to avoid carrying large amounts of cash for convenience and security.'
      },
      {
        'question': 'Do you have any tips for finding tokens?',
        'answer': 'Look out for tokens on the ground, as you might find some lost by others.'
      },
      {
        'question': 'What are eco tokens?',
        'answer': 'Festivals generate a lot of waste, and Defqon.1 is no exception. To manage this, recycling tokens (eco tokens) have been introduced. These tokens act as a deposit for drink containers.'
      },
      {
        'question': 'How do eco tokens work?',
        'answer': 'When ordering a drink, the displayed price is for the contents only. If you have an eco token, you exchange it for the container and pay only for the drink. If you don\'t have an eco token, you\'ll pay an additional ½ token for the container. For example, a drink listed as 1 token will cost 1.5 tokens if you don\'t have an eco token.'
      }
    ]
  },
  {
    title: 'Food & Drinks',
    entries: [
      {
        question: 'Staying hydrated on the festival',
        answer: 'If you just want to stay hydrated, you have two options: you can either bring bottled water or use a dedicated water bottle. For 2 tokens, you can buy a water bottle in Defqon.1 colors, which you can take anywhere and refill as needed. Fresh water is available at all the toilets and at stands dedicated to filling water bottles. Given the 2-token price, I strongly recommend purchasing one, especially if the weather is hot.'
      },
      {
        question: 'Can I bring drinks from the campsite to the festival?',
        answer: 'No, drinks from the campsite must stay at the campsite. When you go through the festival gates, you\'ll have to either finish your drinks or dispose of them. Only water bottles are allowed on the festival grounds.'
      },
      {
        question: 'Where can I get food?',
        answer: 'Food can be found in several locations at the festival: on the campsite (Wasted Lands), at various food stands across the festival grounds, and at the food court across the pond near the RED stage.',
      },
      {
        question: 'What kind of food can I get on the festival grounds?',
        answer: `The festival grounds offer a diverse range of food options, including Asian cuisine, burgers, BBQ and wraps, chicken dishes, snacks, and various international foods like Turkish pizza, Korean fried chicken, and Mexican BBQ. For example, you can find churros, coffee, fruit juice, pasta, pizza, and ice cream.<br><br>Meal prices generally range from 2 to 4 tokens. For reference, a croque monsieur costs 2 tokens (€7.60), while BBQ wraps and kebabs cost 3 tokens (€11.40). Despite the variety, the prices are considered quite high for the portion sizes and quality.`
      }
    ]
  },
  {
    'title': 'Camping',
    'entries': [
      {
        'question': 'Are you planning to sleep?',
        'answer': "Partying for 4 days also means resting from time to time, and that's not always easy. Party and rest don't necessarily go together, and keep in mind that we're talking about a marathon here. Remember that Defqon.1 stretches over several days."
      },
      {
        'question': 'Forget silence for 4 days',
        'answer': "In the camp, the biggest party-goers will certainly not go to bed until the early hours of the morning, and will be active throughout the night. Discussions will be ongoing, and not everyone will be whispering. Some campers will bring music, ranging from small pocket speakers to JBL Partyboxes. Don't be surprised to see campers with turntables throwing after-parties, or even a procession of campers marching down the main aisle."
      },
      {
        'question': 'What about the purrs?',
        'answer': "Tents and camping also mean no soundproofing. Even if you think you're in the clear once your tent door is closed, if you take too long to fall asleep, your neighbors will lull you to sleep with the gentle sound of their snoring. If you're a light sleeper, be warned that your sleep may be totally disrupted."
      },
      {
        'question': 'Are you a light sleeper?',
        'answer': "For heavy sleepers, no worries. But if you're a light sleeper, be prepared for your sleep to be disrupted. Noise, light, or heat might bother you, so consider bringing a sleep mask or investing in a fresh&black tent for better sleep quality."
      },
      {
        'question': 'Keep your eyes peeled!',
        'answer': "Once you've passed the search and have access to the campsite, contact the person responsible for your plot to find out where to pitch your tent. Choose a spot away from main roads, thickets, and toilets for a quieter experience."
      }
    ]
  },
]
</script>