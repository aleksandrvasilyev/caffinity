import { useState } from "react";

/**
 * Our useFetch hook should be used for all communication with the server.
 *
 * route - This is the route you want to access on the server. It should NOT include the /api part, so should be /user or /user/{id}
 * onReceived - a function that will be called with the response of the server. Will only be called if everything went well!
 *
 * Our hook will give you an object with the properties:
 *
 * isLoading - true if the fetch is still in progress
 * error - will contain an Error object if something went wrong
 * performFetch - this function will trigger the fetching. It is up to the user of the hook to determine when to do this!
 * cancelFetch - this function will cancel the fetch, call it when your component is unmounted
 */
const useFetch = (route, onReceived) => {
  /**
   * We use the AbortController which is supported by all modern browsers to handle cancellations
   * For more info: https://developer.mozilla.org/en-US/docs/Web/API/AbortController
   */
  const controller = new AbortController();
  const signal = controller.signal;
  const cancelFetch = () => {
    controller.abort();
  };

  if (route.includes("api/")) {
    /**
     * We add this check here to provide a better error message if you accidentally add the api part
     * As an error that happens later because of this can be very confusing!
     */
    throw Error(
      "when using the useFetch hook, the route should not include the /api/ part",
    );
  }

  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  // Add any args given to the function to the fetch function
  const performFetch = (options) => {
    setError(null);
    setIsLoading(true);

    const baseOptions = {
      method: "GET",
      headers: {
        "content-type": "application/json",
      },
    };

    const fetchData = async () => {
      // We add the /api subsection here to make it a single point of change if our configuration changes

      const baseUrl = `${process.env.BASE_SERVER_URL}/api${route}`;
      let url = baseUrl;

      // if method is GET or not provided, we add the params to the URL
      if (!options?.method || options.method === "GET") {
        //  use URLSearchParams to create a query string from an object
        const params = new URLSearchParams();

        //  add the page and limit to the query string if they are provided
        if (options?.params) {
          params.append("page", options.params.page || "1");
          params.append("limit", options.params.limit || "10");
        }

        // add the search to the query string if it is provided
        if (options?.search) {
          params.append("search", options.search);
        }

        // add the utilities to the query string if it is provided
        if (options?.utilities) {
          params.append("utilities", options.utilities);
        }

        // add the city to the query string if it is provided
        if (options?.city) {
          params.append("city", options.city);
        }

        // add the foodOptions to the query string if it is provided
        if (options?.foodOptions) {
          params.append("foodOptions", options.foodOptions);
        }

        //  if there is params add them to the base URL with a ? prefix
        if (params.toString()) {
          url = `${baseUrl}?${params.toString()}`;
        }
      }

      //  if the method is not GET, we add the body to the options
      const fetchOptions = {
        ...baseOptions,
        ...options,
        signal,
      };

      const res = await fetch(url, fetchOptions);

      if (!res.ok) {
        setError(
          `Fetch for ${url} returned an invalid status (${
            res.status
          }). Received: ${JSON.stringify(res)}`,
        );
      }

      const jsonResult = await res.json();

      if (jsonResult.success === true) {
        onReceived(jsonResult);
      } else {
        setError(
          jsonResult.msg ||
            `The result from our API did not have an error message. Received: ${JSON.stringify(
              jsonResult,
            )}`,
        );
      }

      setIsLoading(false);
    };

    fetchData().catch((error) => {
      setError(error);
      setIsLoading(false);
    });
  };

  return { isLoading, error, performFetch, cancelFetch };
};

export default useFetch;
