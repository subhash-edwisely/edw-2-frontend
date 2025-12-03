// mockData.js - Simulates Flask API responses
// Later, replace these functions with actual fetch() calls to your Flask backend

// GET /api/problems/:id
export const getProblemById = (problemId) => {
  return {
    id: "prob_1",
    title: "Two Sum",
    difficulty: "Easy",
    description: "Given an array of integers nums and an integer target, return indices of the two numbers such that they add up to target.\n\nYou may assume that each input would have exactly one solution, and you may not use the same element twice.\n\nYou can return the answer in any order.",
    xpReward: 10
  };
};

// GET /api/problems/:id/hints
export const getProblemHints = (problemId) => {
  return [
    {
      id: "hint_1",
      problemId: "prob_1",
      content: "Try using a hash map to store the numbers you've seen so far.",
      orderIndex: 1
    },
    {
      id: "hint_2",
      problemId: "prob_1",
      content: "For each number, check if target - current number exists in your hash map.",
      orderIndex: 2
    },
    {
      id: "hint_3",
      problemId: "prob_1",
      content: "The time complexity can be reduced to O(n) with this approach.",
      orderIndex: 3
    }
  ];
};

// GET /api/problems/:id/constraints
export const getProblemConstraints = (problemId) => {
  return [
    {
      id: "const_1",
      problemId: "prob_1",
      description: "2 <= nums.length <= 10^4",
      orderIndex: 1
    },
    {
      id: "const_2",
      problemId: "prob_1",
      description: "-10^9 <= nums[i] <= 10^9",
      orderIndex: 2
    },
    {
      id: "const_3",
      problemId: "prob_1",
      description: "-10^9 <= target <= 10^9",
      orderIndex: 3
    },
    {
      id: "const_4",
      problemId: "prob_1",
      description: "Only one valid answer exists",
      orderIndex: 4
    }
  ];
};

// GET /api/problems/:id/editorial
export const getProblemEditorial = (problemId) => {
  return {
    id: "edit_1",
    problemId: "prob_1",
    content: "# Approach 1: Brute Force\n\nThe brute force approach is simple. Loop through each element x and find if there is another value that equals to target - x.\n\n**Algorithm:**\n- Use two nested loops\n- For each element, check all other elements\n- Return indices when sum equals target\n\n**Complexity:**\n- Time: O(n²)\n- Space: O(1)\n\n# Approach 2: Hash Map (Optimal)\n\nWe can improve the time complexity by using a hash map. While iterating through the array, we check if the complement (target - current number) exists in the hash map.\n\n**Algorithm:**\n1. Create an empty hash map\n2. Iterate through the array\n3. For each element:\n   - Calculate complement = target - current element\n   - If complement exists in hash map, return [hash map value, current index]\n   - Otherwise, add current element and its index to hash map\n\n**Complexity:**\n- Time: O(n)\n- Space: O(n)",
    videoUrl: "https://youtube.com/watch?v=example123"
  };
};

// GET /api/problems/:id/testcases
export const getProblemTestCases = (problemId) => {
  return [
    {
      id: "test_1",
      problemId: "prob_1",
      input: "[2,7,11,15]\n9",
      expectedOutput: "[0,1]",
      isHidden: false,
      orderIndex: 1
    },
    {
      id: "test_2",
      problemId: "prob_1",
      input: "[3,2,4]\n6",
      expectedOutput: "[1,2]",
      isHidden: false,
      orderIndex: 2
    },
    {
      id: "test_3",
      problemId: "prob_1",
      input: "[3,3]\n6",
      expectedOutput: "[0,1]",
      isHidden: false,
      orderIndex: 3
    },
    {
      id: "test_4",
      problemId: "prob_1",
      input: "[1,5,3,7,8,9]\n12",
      expectedOutput: "[2,4]",
      isHidden: true,
      orderIndex: 4
    },
    {
      id: "test_5",
      problemId: "prob_1",
      input: "[-1,-2,-3,-4,-5]\n-8",
      expectedOutput: "[2,4]",
      isHidden: true,
      orderIndex: 5
    }
  ];
};

// GET /api/problems/:id/tags
export const getProblemTags = (problemId) => {
  return [
    {
      id: "tag_1",
      name: "Array",
      category: "topic"
    },
    {
      id: "tag_2",
      name: "Hash Table",
      category: "topic"
    },
    {
      id: "tag_3",
      name: "Google",
      category: "company"
    },
    {
      id: "tag_4",
      name: "Amazon",
      category: "company"
    }
  ];
};

// GET /api/problems (list all problems)
export const getAllProblems = () => {
  return [
    {
      id: "prob_1",
      title: "Two Sum",
      difficulty: "Easy",
      xpReward: 10
    },
    {
      id: "prob_2",
      title: "Add Two Numbers",
      difficulty: "Medium",
      xpReward: 20
    },
    {
      id: "prob_3",
      title: "Median of Two Sorted Arrays",
      difficulty: "Hard",
      xpReward: 30
    }
  ];
};