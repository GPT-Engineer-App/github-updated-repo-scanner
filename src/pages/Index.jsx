import React, { useState } from "react";
import { Container, VStack, Input, Button, Text, Box, HStack, IconButton, List, ListItem, Spinner } from "@chakra-ui/react";
import { FaSearch, FaTimes } from "react-icons/fa";

const mockGitHubApiCall = (searchText, exclusions) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const mockData = [
        { id: 1, name: "react", description: "A declarative, efficient, and flexible JavaScript library for building user interfaces.", updated_at: "2023-10-01T12:34:56Z" },
        { id: 2, name: "vue", description: "🖖 Vue.js is a progressive, incrementally-adoptable JavaScript framework for building UI on the web.", updated_at: "2023-10-02T12:34:56Z" },
        { id: 3, name: "angular", description: "One framework. Mobile & desktop.", updated_at: "2023-10-03T12:34:56Z" },
      ];
      const filteredData = mockData.filter((repo) => repo.name.includes(searchText) && !exclusions.some((exclusion) => repo.name.includes(exclusion)));
      resolve(filteredData);
    }, 1000);
  });
};

const Index = () => {
  const [searchText, setSearchText] = useState("");
  const [exclusions, setExclusions] = useState([]);
  const [repos, setRepos] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleSearch = async () => {
    setLoading(true);
    const results = await mockGitHubApiCall(searchText, exclusions);
    setRepos(results);
    setLoading(false);
  };

  const handleAddExclusion = (exclusion) => {
    setExclusions([...exclusions, exclusion]);
  };

  const handleRemoveExclusion = (exclusion) => {
    setExclusions(exclusions.filter((ex) => ex !== exclusion));
  };

  return (
    <Container centerContent maxW="container.md" py={10}>
      <VStack spacing={4} width="100%">
        <HStack width="100%">
          <Input placeholder="Search text" value={searchText} onChange={(e) => setSearchText(e.target.value)} />
          <Button leftIcon={<FaSearch />} colorScheme="teal" onClick={handleSearch}>
            Search
          </Button>
        </HStack>
        <HStack width="100%">
          <Input placeholder="Add exclusion" onKeyDown={(e) => e.key === "Enter" && handleAddExclusion(e.target.value)} />
        </HStack>
        <HStack spacing={2} wrap="wrap">
          {exclusions.map((exclusion, index) => (
            <Box key={index} bg="gray.200" px={2} py={1} borderRadius="md">
              <HStack spacing={1}>
                <Text>{exclusion}</Text>
                <IconButton aria-label="Remove exclusion" icon={<FaTimes />} size="xs" onClick={() => handleRemoveExclusion(exclusion)} />
              </HStack>
            </Box>
          ))}
        </HStack>
        {loading ? (
          <Spinner size="xl" />
        ) : (
          <List spacing={3} width="100%">
            {repos.map((repo) => (
              <ListItem key={repo.id} p={4} borderWidth={1} borderRadius="md">
                <Text fontSize="xl" fontWeight="bold">
                  {repo.name}
                </Text>
                <Text>{repo.description}</Text>
                <Text fontSize="sm" color="gray.500">
                  Last updated: {new Date(repo.updated_at).toLocaleString()}
                </Text>
              </ListItem>
            ))}
          </List>
        )}
      </VStack>
    </Container>
  );
};

export default Index;
