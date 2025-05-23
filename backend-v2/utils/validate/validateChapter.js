import { Chapter } from "../../models/index.js";

/**
 * Validate chapter data with composite unique check (name + affiliated + address)
 * @param {Object} input.chapter - { name: string, affiliated: string, address: string, ... }
 * @param {boolean} isUpdate - Check for update operation
 * @param {string} chapterId - Current chapter ID (for update case)
 * @returns {Promise<{ isValid: boolean, message?: string }>}
 */
export const validateChapter = async (
  input,
  isUpdate = false,
  chapterId = null
) => {
  try {
    // Composite unique check
    const duplicateCondition = {
      name: input.chapter.name.trim(),
      affiliated: input.chapter.affiliated.trim(),
      address: input.chapter.address.trim(),
    };

    if (isUpdate) {
      duplicateCondition._id = { $ne: chapterId };
    }

    const existingChapter = await Chapter.findOne(duplicateCondition);

    if (existingChapter) {
      console.log(
        `Chapter with the same name, affiliated and address already exists (ID: ${existingChapter._id})`
      );
      return false;
    }

    return true;
  } catch (error) {
    console.error("[validateChapter] Error:", error);
    return { isValid: false, message: "Validation error" };
  }
};
