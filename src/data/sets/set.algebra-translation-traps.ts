import type { ProblemSet } from '../../types';

export const ALGEBRA_TRANSLATION_TRAPS: ProblemSet = {
  id: 'algebra-translation-traps',
  name: 'Algebra Translation Traps',
  icon: 'target',
  tags: [
    'Algebra',
    'Word problems',
    'Percentages',
    'Ratios',
    'Rates',
    'Work & rates',
  ],
  targetBand: '155-165',
  description:
    'A focused drill on translating GRE wording into equations, recognizing hidden structure, and avoiding common algebraic traps.',
  problems: [
    {
      id: 'algebra-translation-traps-1',
      level: 3,
      topic: 'Algebra',
      difficulty: 2,
      questionText:
        'The sum of three consecutive integers is 99. What is the greatest of the three integers?',
      answer: '34',
      hint:
        'Represent the middle integer with a variable and write the other two relative to it.',
      steps: [
        {
          label: 'Represent the integers',
          question:
            'If the middle integer is n, which expression represents the three consecutive integers?',
          choices: [
            'n, n + 1, n + 2',
            'n - 1, n, n + 1',
            'n - 2, n, n + 2',
            'n, 2n, 3n',
          ],
          correctIndex: 1,
          explanation:
            'Three consecutive integers centered at n are n - 1, n, and n + 1.',
          why:
            'Using the middle integer causes the outer terms to cancel when the integers are added.',
        },
        {
          label: 'Build the equation',
          question: 'Which equation represents the sum of the integers?',
          choices: [
            '3n = 99',
            '3n + 1 = 99',
            '3n - 1 = 99',
            '6n = 99',
          ],
          correctIndex: 0,
          explanation:
            '(n - 1) + n + (n + 1) simplifies to 3n.',
          why:
            'The negative 1 and positive 1 cancel, leaving three copies of n.',
        },
        {
          label: 'Find the greatest integer',
          question: 'What is the greatest of the three integers?',
          choices: ['32', '33', '34', '35'],
          correctIndex: 2,
          explanation:
            'Solving 3n = 99 gives n = 33, so the greatest integer is n + 1 = 34.',
          why:
            'The variable n represents the middle integer, not the greatest integer.',
        },
      ],
    },
    {
      id: 'algebra-translation-traps-2',
      level: 3,
      topic: 'Percentages',
      difficulty: 2,
      questionText:
        'A store increases the price of an item by 20 percent and later discounts the increased price by 20 percent. Compared with the original price, the final price is what percent lower?',
      answer: '4 percent',
      hint:
        'Use an original price of 100 and apply each percentage change separately.',
      steps: [
        {
          label: 'Choose a base value',
          question:
            'If the original price is 100, what is the price after a 20 percent increase?',
          choices: ['104', '110', '120', '125'],
          correctIndex: 2,
          explanation:
            'A 20 percent increase on 100 adds 20, producing a price of 120.',
          why:
            'A convenient base of 100 turns percentages directly into numerical amounts.',
        },
        {
          label: 'Apply the discount',
          question:
            'What is the price after reducing 120 by 20 percent?',
          choices: ['80', '96', '100', '104'],
          correctIndex: 1,
          explanation:
            'Twenty percent of 120 is 24, so the discounted price is 120 - 24 = 96.',
          why:
            'The discount is calculated from the increased price, not from the original price.',
        },
        {
          label: 'Compare prices',
          question:
            'The final price of 96 is what percent lower than the original price of 100?',
          choices: ['2 percent', '4 percent', '8 percent', '20 percent'],
          correctIndex: 1,
          explanation:
            'The price decreased from 100 to 96, which is a decrease of 4 percent.',
          why:
            'Equal percentage increases and decreases do not cancel because they use different base values.',
        },
      ],
    },
    {
      id: 'algebra-translation-traps-3',
      level: 3,
      topic: 'Ratios',
      difficulty: 2,
      questionText:
        'If x to y is 3 to 5 and y to z is 10 to 7, what is x to z?',
      answer: '6 to 7',
      hint:
        'Rewrite both ratios so that the value corresponding to y is the same.',
      steps: [
        {
          label: 'Match the shared term',
          question:
            'Which equivalent ratio for x to y gives y a value of 10?',
          choices: ['3 to 10', '5 to 10', '6 to 10', '10 to 15'],
          correctIndex: 2,
          explanation:
            'Multiplying both parts of 3 to 5 by 2 gives 6 to 10.',
          why:
            'The y value must match the y value in the second ratio before the ratios can be combined.',
        },
        {
          label: 'Combine the ratios',
          question:
            'If x to y is 6 to 10 and y to z is 10 to 7, what is x to z?',
          choices: ['3 to 7', '5 to 7', '6 to 7', '6 to 17'],
          correctIndex: 2,
          explanation:
            'The matched ratios show x = 6, y = 10, and z = 7 in the same scale.',
          why:
            'Once the shared term is equal, the values for x and z can be compared directly.',
        },
      ],
    },
    {
      id: 'algebra-translation-traps-4',
      level: 4,
      topic: 'Rates',
      difficulty: 3,
      questionText:
        'A car travels from City A to City B at 60 miles per hour and returns along the same route at 40 miles per hour. What is the average speed for the entire trip?',
      answer: '48 miles per hour',
      hint:
        'Average speed is total distance divided by total time. Do not simply average 60 and 40.',
      steps: [
        {
          label: 'Choose a distance',
          question:
            'Which one-way distance makes the travel times especially easy to calculate?',
          choices: ['40 miles', '60 miles', '100 miles', '120 miles'],
          correctIndex: 3,
          explanation:
            'A distance of 120 miles is divisible by both 60 and 40.',
          why:
            'A convenient distance simplifies the arithmetic without changing the average speed.',
        },
        {
          label: 'Calculate total time',
          question:
            'For a 120-mile route, how much total time does the round trip require?',
          choices: ['4 hours', '5 hours', '6 hours', '7 hours'],
          correctIndex: 1,
          explanation:
            'The first trip takes 120 / 60 = 2 hours, and the return trip takes 120 / 40 = 3 hours.',
          why:
            'The slower part of the trip takes more time and therefore has more influence on the average speed.',
        },
        {
          label: 'Calculate average speed',
          question:
            'What is the average speed over 240 miles traveled in 5 hours?',
          choices: [
            '45 miles per hour',
            '48 miles per hour',
            '50 miles per hour',
            '52 miles per hour',
          ],
          correctIndex: 1,
          explanation:
            'Average speed equals 240 / 5 = 48 miles per hour.',
          why:
            'Average speed must be based on total distance and total elapsed time.',
        },
      ],
    },
    {
      id: 'algebra-translation-traps-5',
      level: 4,
      topic: 'Work & rates',
      difficulty: 3,
      questionText:
        'Machine A can complete a job in 6 hours, and Machine B can complete the same job in 4 hours. How many hours will the machines require to complete the job working together?',
      answer: '12/5 hours',
      hint:
        'Add the fraction of the job completed by each machine in one hour.',
      steps: [
        {
          label: 'Find individual rates',
          question:
            'What fraction of the job can the two machines complete together in one hour?',
          choices: ['1/10', '2/5', '5/12', '1/2'],
          correctIndex: 2,
          explanation:
            'Machine A completes 1/6 of the job per hour, and Machine B completes 1/4. Their combined rate is 1/6 + 1/4 = 5/12.',
          why:
            'For work problems, rates are added rather than completion times.',
        },
        {
          label: 'Convert rate to time',
          question:
            'If the machines complete 5/12 of the job each hour, how long does one full job require?',
          choices: ['5/12 hour', '5/2 hours', '12/5 hours', '10/3 hours'],
          correctIndex: 2,
          explanation:
            'Time is the reciprocal of the combined rate, so the required time is 12/5 hours.',
          why:
            'A rate of jobs per hour must be inverted to obtain hours per job.',
        },
      ],
    },
    {
      id: 'algebra-translation-traps-6',
      level: 4,
      topic: 'Mixtures',
      difficulty: 3,
      questionText:
        'A container holds 40 liters of a solution that is 30 percent acid. How many liters of water must be added to make the solution 20 percent acid?',
      answer: '20 liters',
      hint:
        'The amount of acid remains constant when only water is added.',
      steps: [
        {
          label: 'Find the acid amount',
          question:
            'How many liters of acid are in the original solution?',
          choices: ['8 liters', '10 liters', '12 liters', '14 liters'],
          correctIndex: 2,
          explanation:
            'Thirty percent of 40 liters is 0.30 * 40 = 12 liters.',
          why:
            'Adding water changes the total volume but does not change the amount of acid.',
        },
        {
          label: 'Find the required total',
          question:
            'If 12 liters must represent 20 percent of the final solution, what must the final volume be?',
          choices: ['48 liters', '50 liters', '60 liters', '72 liters'],
          correctIndex: 2,
          explanation:
            'If 0.20 * total volume = 12, then the total volume is 12 / 0.20 = 60 liters.',
          why:
            'The fixed amount of acid determines the total volume needed for the new concentration.',
        },
        {
          label: 'Find added water',
          question:
            'How much water must be added to increase the volume from 40 liters to 60 liters?',
          choices: ['12 liters', '18 liters', '20 liters', '24 liters'],
          correctIndex: 2,
          explanation:
            'The amount added is 60 - 40 = 20 liters.',
          why:
            'Only the increase in total volume represents the water that was added.',
        },
      ],
    },
    {
      id: 'algebra-translation-traps-7',
      level: 5,
      topic: 'Quantitative comparison',
      difficulty: 4,
      questionText:
        'For positive x, compare Quantity A: x + 1/x and Quantity B: 2.',
      answer: 'Quantity A is greater than or equal to Quantity B',
      hint:
        'Use the fact that (x - 1)^2 is nonnegative.',
      steps: [
        {
          label: 'Test equality',
          question:
            'What is the value of x + 1/x when x = 1?',
          choices: ['1', '2', '3', '4'],
          correctIndex: 1,
          explanation:
            'When x = 1, the expression is 1 + 1 = 2.',
          why:
            'This shows equality is possible.',
        },
        {
          label: 'Analyze generally',
          question:
            'Which inequality is true for every positive x?',
          choices: [
            'x + 1/x < 2',
            'x + 1/x <= 2',
            'x + 1/x >= 2',
            'x + 1/x = 2',
          ],
          correctIndex: 2,
          explanation:
            'Since (x - 1)^2 >= 0, dividing by positive x gives x - 2 + 1/x >= 0, so x + 1/x >= 2.',
          why:
            'Testing examples is not enough when a general algebraic proof is available.',
        },
      ],
    },
    {
      id: 'algebra-translation-traps-8',
      level: 4,
      topic: 'Quadratics',
      difficulty: 3,
      questionText:
        'The equation x^2 - 10x + 21 = 0 has two solutions. What is the positive difference between the solutions?',
      answer: '4',
      hint:
        'Find two numbers whose product is 21 and whose sum is 10.',
      steps: [
        {
          label: 'Factor the quadratic',
          question:
            'Which factorization is equivalent to x^2 - 10x + 21?',
          choices: [
            '(x - 1)(x - 21)',
            '(x - 3)(x - 7)',
            '(x + 3)(x + 7)',
            '(x - 4)(x - 6)',
          ],
          correctIndex: 1,
          explanation:
            'The numbers 3 and 7 multiply to 21 and add to 10, so the factorization is (x - 3)(x - 7).',
          why:
            'The signs must produce a negative middle term and a positive constant term.',
        },
        {
          label: 'Find the solutions',
          question: 'What are the two solutions?',
          choices: ['1 and 21', '3 and 7', '-3 and -7', '4 and 6'],
          correctIndex: 1,
          explanation:
            'Setting each factor equal to zero gives x = 3 and x = 7.',
          why:
            'A product equals zero when at least one of its factors equals zero.',
        },
        {
          label: 'Find the difference',
          question:
            'What is the positive difference between the two solutions?',
          choices: ['3', '4', '7', '10'],
          correctIndex: 1,
          explanation:
            'The positive difference is 7 - 3 = 4.',
          why:
            'The question asks for the distance between the solutions, not their sum.',
        },
      ],
    },
    {
      id: 'algebra-translation-traps-9',
      level: 4,
      topic: 'Statistics',
      difficulty: 3,
      questionText:
        'The numbers 4, 7, 9, 12, and 18 have a sixth number added to them. If the mean of all six numbers is 10, what is the median of the six numbers?',
      answer: '19/2',
      hint:
        'Use the required mean to find the added number, then reorder the complete list.',
      steps: [
        {
          label: 'Find the required total',
          question:
            'What must the sum of six numbers be if their mean is 10?',
          choices: ['50', '55', '60', '65'],
          correctIndex: 2,
          explanation:
            'The total equals mean * number of values, so the total is 10 * 6 = 60.',
          why:
            'The definition of mean allows the total sum to be recovered.',
        },
        {
          label: 'Find the added number',
          question:
            'The five original numbers have a sum of 50. What number must be added?',
          choices: ['0', '5', '10', '12'],
          correctIndex: 2,
          explanation:
            'The added number must be 60 - 50 = 10.',
          why:
            'The new total must reach 60 for the six-number mean to equal 10.',
        },
        {
          label: 'Calculate the median',
          question:
            'What is the median of 4, 7, 9, 10, 12, and 18?',
          choices: ['8', '9', '19/2', '10'],
          correctIndex: 2,
          explanation:
            'For six values, the median is the mean of the third and fourth values: (9 + 10) / 2 = 19/2.',
          why:
            'An even number of observations has two central values rather than one.',
        },
      ],
    },
    {
      id: 'algebra-translation-traps-10',
      level: 4,
      topic: 'Word problems',
      difficulty: 3,
      questionText:
        'A theater sold 80 tickets. Adult tickets cost 15 dollars each, child tickets cost 9 dollars each, and total revenue was 960 dollars. How many adult tickets were sold?',
      answer: '40',
      hint:
        'Create one equation for the number of tickets and another for the revenue.',
      steps: [
        {
          label: 'Define the variables',
          question:
            'If a is the number of adult tickets and c is the number of child tickets, which equation represents the total number of tickets?',
          choices: [
            'a + c = 80',
            '15a + 9c = 80',
            'a - c = 80',
            '15a + c = 80',
          ],
          correctIndex: 0,
          explanation:
            'The total number of adult and child tickets is 80, so a + c = 80.',
          why:
            'Ticket counts and ticket revenue must be represented by separate equations.',
        },
        {
          label: 'Write the revenue equation',
          question: 'Which equation represents the total revenue?',
          choices: [
            '9a + 15c = 80',
            '15a + 9c = 80',
            '15a + 9c = 960',
            '24a + c = 960',
          ],
          correctIndex: 2,
          explanation:
            'Adult revenue is 15a, child revenue is 9c, and their sum is 960.',
          why:
            'Each ticket count must be multiplied by its corresponding price.',
        },
        {
          label: 'Solve the system',
          question:
            'Substituting c = 80 - a into the revenue equation produces which value of a?',
          choices: ['30', '40', '50', '60'],
          correctIndex: 1,
          explanation:
            '15a + 9(80 - a) = 960 simplifies to 6a = 240, so a = 40.',
          why:
            'Substitution reduces the two-variable system to one equation in a.',
        },
      ],
    },
    {
      id: 'algebra-translation-traps-11',
      level: 4,
      topic: 'Exponents',
      difficulty: 3,
      questionText:
        'If 2^(x + 1) = 8^(x - 1), what is the value of x?',
      answer: '2',
      hint:
        'Rewrite 8 as a power of 2.',
      steps: [
        {
          label: 'Use a common base',
          question:
            'Which expression is equivalent to 8^(x - 1)?',
          choices: [
            '2^(x - 1)',
            '2^(3x - 1)',
            '2^(3x - 3)',
            '2^(8x - 8)',
          ],
          correctIndex: 2,
          explanation:
            'Since 8 = 2^3, 8^(x - 1) = 2^(3(x - 1)) = 2^(3x - 3).',
          why:
            'Writing both sides with the same base allows their exponents to be compared.',
        },
        {
          label: 'Set exponents equal',
          question:
            'Which equation follows after both sides are expressed with base 2?',
          choices: [
            'x + 1 = x - 1',
            'x + 1 = 3x - 3',
            '2x + 1 = 3x - 3',
            'x + 1 = 8x - 8',
          ],
          correctIndex: 1,
          explanation:
            'Equal powers with the same positive base have equal exponents.',
          why:
            'The exponential equation becomes a linear equation once the bases match.',
        },
        {
          label: 'Solve for x',
          question: 'What is the value of x?',
          choices: ['1', '2', '3', '4'],
          correctIndex: 1,
          explanation:
            'Solving x + 1 = 3x - 3 gives 4 = 2x, so x = 2.',
          why:
            'The final step requires ordinary linear equation solving.',
        },
      ],
    },
    {
      id: 'algebra-translation-traps-12',
      level: 5,
      topic: 'Probability',
      difficulty: 4,
      questionText:
        'A bag contains 5 red balls and 3 blue balls. If 2 balls are selected at random without replacement, what is the probability that both balls are the same color?',
      answer: '13/28',
      hint:
        'The successful outcomes are two red balls or two blue balls.',
      steps: [
        {
          label: 'Count all selections',
          question:
            'How many unordered pairs can be selected from 8 balls?',
          choices: ['16', '24', '28', '56'],
          correctIndex: 2,
          explanation:
            'The number of unordered pairs is 8 * 7 / 2 = 28.',
          why:
            'Dividing by 2 removes duplicate orders such as selecting ball A then B versus B then A.',
        },
        {
          label: 'Count successful selections',
          question:
            'How many pairs contain two balls of the same color?',
          choices: ['10', '12', '13', '15'],
          correctIndex: 2,
          explanation:
            'There are 5 * 4 / 2 = 10 red pairs and 3 * 2 / 2 = 3 blue pairs, for 13 successful pairs.',
          why:
            'The red-red and blue-blue outcomes are mutually exclusive, so their counts are added.',
        },
        {
          label: 'Calculate probability',
          question:
            'What is the probability of selecting two balls of the same color?',
          choices: ['3/8', '5/14', '13/28', '1/2'],
          correctIndex: 2,
          explanation:
            'The probability is successful outcomes divided by all outcomes: 13/28.',
          why:
            'All unordered pairs are equally likely under random selection without replacement.',
        },
      ],
    },
  ],
};
