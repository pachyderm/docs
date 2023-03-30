# walk through the content/ directory and check all the markdown files for the word "Pachyderm" and replace it with "MLDM".

# find all the markdown files in the content/ directory
find content/ -name "*.md" -type f -print0 | while IFS= read -r -d '' file; do
    # replace all the instances of "Pachyderm" with "MLDM"
    sed -i '' 's/Pachyderm/MLDM/g' "$file"
done