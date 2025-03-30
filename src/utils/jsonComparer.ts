interface ComparisonResult {
  valueMismatches: Array<{
    path: string;
    value1: any;
    value2: any;
  }>;
  typeMismatches: Array<{
    path: string;
    type1: string;
    type2: string;
  }>;
  missingProperties: Array<{
    path: string;
    inFirst: boolean;
  }>;
  arrayLengthMismatches: Array<{
    path: string;
    length1: number;
    length2: number;
  }>;
}

const sortObjectKeys = (obj: any): any => {
  if (Array.isArray(obj)) {
    return obj.map(item => sortObjectKeys(item));
  }
  
  if (obj !== null && typeof obj === 'object') {
    return Object.keys(obj)
      .sort()
      .reduce((result: any, key) => {
        result[key] = sortObjectKeys(obj[key]);
        return result;
      }, {});
  }
  
  return obj;
};

export const compareJson = (
  json1: any,
  json2: any,
  path: string = ''
): ComparisonResult => {
  const result: ComparisonResult = {
    valueMismatches: [],
    typeMismatches: [],
    missingProperties: [],
    arrayLengthMismatches: [],
  };

  // Check if both values are arrays
  if (Array.isArray(json1) && Array.isArray(json2)) {
    if (json1.length !== json2.length) {
      result.arrayLengthMismatches.push({
        path,
        length1: json1.length,
        length2: json2.length,
      });
      return result;
    }
  }

  // Sort properties alphabetically
  const keys1 = Object.keys(json1).sort();
  const keys2 = Object.keys(json2).sort();

  // Check for missing properties
  const allKeys = new Set([...keys1, ...keys2]);
  allKeys.forEach((key) => {
    const currentPath = path ? `${path}.${key}` : key;
    if (!keys1.includes(key)) {
      result.missingProperties.push({ path: currentPath, inFirst: false });
    }
    if (!keys2.includes(key)) {
      result.missingProperties.push({ path: currentPath, inFirst: true });
    }
  });

  // Compare common properties
  keys1.forEach((key) => {
    if (keys2.includes(key)) {
      const currentPath = path ? `${path}.${key}` : key;
      const value1 = json1[key];
      const value2 = json2[key];

      // Check type mismatch
      if (typeof value1 !== typeof value2) {
        result.typeMismatches.push({
          path: currentPath,
          type1: typeof value1,
          type2: typeof value2,
        });
        return;
      }

      // Compare values
      if (typeof value1 === 'object' && value1 !== null) {
        const nestedResult = compareJson(value1, value2, currentPath);
        result.valueMismatches.push(...nestedResult.valueMismatches);
        result.typeMismatches.push(...nestedResult.typeMismatches);
        result.missingProperties.push(...nestedResult.missingProperties);
        result.arrayLengthMismatches.push(...nestedResult.arrayLengthMismatches);
      } else if (value1 !== value2) {
        result.valueMismatches.push({
          path: currentPath,
          value1,
          value2,
        });
      }
    }
  });

  return result;
};

export const formatJson = (json: any): string => {
  const sortedJson = sortObjectKeys(json);
  return JSON.stringify(sortedJson, null, 2);
};

export const parseJson = (jsonString: string): any => {
  try {
    return JSON.parse(jsonString);
  } catch (error) {
    return null;
  }
}; 