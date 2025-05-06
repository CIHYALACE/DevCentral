import React, { useEffect, useState } from "react";
import {
  Container,
  Table,
  Button,
  Badge,
  Spinner,
  Alert,
  Card,
} from "react-bootstrap";
import {
  adminStore,
  fetchDeveloperRequests,
  approveDeveloperRequest,
  rejectDeveloperRequest,
  revokeApproval,
} from "../../store/adminStore";
import { useStore } from "@tanstack/react-store";
import { Paginator } from "../../components/common/Paginator";

export default function AdminRequests() {
  // Get the developer requests from the store
  const developerRequests = useStore(
    adminStore,
    (state) => state.developerRequests
  );
  const [processingIds, setProcessingIds] = useState([]);
  const [actionError, setActionError] = useState(null);
  const [actionSuccess, setActionSuccess] = useState(null);

  // State for pagination
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);
  const [paginatedRequests, setPaginatedRequests] = useState([]);

  useEffect(() => {
    // Fetch developer requests when the component mounts
    const loadRequests = async () => {
      try {
        await fetchDeveloperRequests();
      } catch (error) {
        console.error("Error loading developer requests:", error);
      }
    };

    loadRequests();
  }, []);

  // Update paginated requests when data or page changes
  useEffect(() => {
    if (developerRequests.data && developerRequests.data.length > 0) {
      const startIndex = (currentPage - 1) * itemsPerPage;
      const endIndex = startIndex + itemsPerPage;
      setPaginatedRequests(developerRequests.data.slice(startIndex, endIndex));
    } else {
      setPaginatedRequests([]);
    }
  }, [developerRequests.data, currentPage, itemsPerPage]);

  // Handle page change
  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  // Handle approving a developer request
  const handleApprove = async (userId) => {
    setActionError(null);
    setActionSuccess(null);
    setProcessingIds((prev) => [...prev, userId]);

    try {
      await approveDeveloperRequest(userId);
      setActionSuccess(`Developer request approved successfully.`);

      // Refresh the list after a short delay
      setTimeout(() => {
        fetchDeveloperRequests();
      }, 1000);
    } catch (error) {
      setActionError(
        `Failed to approve request: ${
          error.response?.data?.error || error.message
        }`
      );
    } finally {
      setProcessingIds((prev) => prev.filter((id) => id !== userId));
    }
  };

  // Handle rejecting a developer request
  const handleReject = async (userId) => {
    setActionError(null);
    setActionSuccess(null);
    setProcessingIds((prev) => [...prev, userId]);

    try {
      await rejectDeveloperRequest(userId);
      setActionSuccess(`Developer request rejected successfully.`);

      // Refresh the list after a short delay
      setTimeout(() => {
        fetchDeveloperRequests();
      }, 1000);
    } catch (error) {
      setActionError(
        `Failed to reject request: ${
          error.response?.data?.error || error.message
        }`
      );
    } finally {
      setProcessingIds((prev) => prev.filter((id) => id !== userId));
    }
  };

  // Handle revoking an approved developer request
  const handleRevoke = async (userId) => {
    setActionError(null);
    setActionSuccess(null);
    setProcessingIds((prev) => [...prev, userId]);

    try {
      await revokeApproval(userId);
      setActionSuccess(`Developer approval revoked successfully.`);

      // Refresh the list after a short delay
      setTimeout(() => {
        fetchDeveloperRequests();
      }, 1000);
    } catch (error) {
      setActionError(
        `Failed to revoke approval: ${
          error.response?.data?.error || error.message
        }`
      );
    } finally {
      setProcessingIds((prev) => prev.filter((id) => id !== userId));
    }
  };

  // Format date for display
  const formatDate = (dateString) => {
    if (!dateString) return "—";
    try {
      const date = new Date(dateString);
      return date.toLocaleString();
    } catch (e) {
      return dateString;
    }
  };

  // Helper function to render loading state
  const renderLoading = () => (
    <div className="text-center py-4">
      <Spinner animation="border" role="status" variant="primary">
        <span className="visually-hidden">Loading...</span>
      </Spinner>
    </div>
  );

  // Helper function to render error state
  const renderError = (error) => (
    <Alert variant="danger">
      {error?.detail || "An error occurred while loading developer requests"}
    </Alert>
  );

  // Helper function to render empty state
  const renderEmpty = () => (
    <div className="text-center py-4">
      <p className="text-muted">No developer requests found.</p>
    </div>
  );

  return (
    <div className="p-4">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2>Developer Requests</h2>
      </div>

      {actionSuccess && (
        <Alert
          variant="success"
          dismissible
          onClose={() => setActionSuccess(null)}
        >
          {actionSuccess}
        </Alert>
      )}

      {actionError && (
        <Alert
          variant="danger"
          dismissible
          onClose={() => setActionError(null)}
        >
          {actionError}
        </Alert>
      )}

      {developerRequests.loading ? (
        renderLoading()
      ) : developerRequests.error ? (
        renderError(developerRequests.error)
      ) : (
        <>
          <Table responsive hover striped className="align-middle">
            <thead className="bg-light">
              <tr>
                <th>User</th>
                <th>Email</th>
                <th>Comment</th>
                <th>Date Requested</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {paginatedRequests.length > 0 ? (
                paginatedRequests.map((request) => (
                  <tr key={request.id}>
                    <td className="fw-medium">
                      {request.user?.name || "Unknown User"}
                    </td>
                    <td>{request.user?.email || "—"}</td>
                    <td>
                      {request.comment ? (
                        <div
                          style={{ maxWidth: "300px", whiteSpace: "pre-wrap" }}
                        >
                          {request.comment}
                        </div>
                      ) : (
                        <span className="text-muted">No comment provided</span>
                      )}
                    </td>
                    <td>{formatDate(request.created_at)}</td>
                    <td>
                      {request.state === "approved" ? (
                        <Badge bg="success">Approved</Badge>
                      ) : request.state === "rejected" ? (
                        <Badge bg="danger">Rejected</Badge>
                      ) : (
                        <Badge bg="warning">Pending</Badge>
                      )}
                    </td>
                    <td>
                      {request.state === "pending" && (
                        <div className="d-flex gap-2">
                          <Button
                            variant="success"
                            size="sm"
                            onClick={() => handleApprove(request.user.id)}
                            disabled={processingIds.includes(request.user.id)}
                          >
                            {processingIds.includes(request.user.id) ? (
                              <>
                                <Spinner
                                  as="span"
                                  animation="border"
                                  size="sm"
                                  role="status"
                                  aria-hidden="true"
                                />
                                <span className="visually-hidden">
                                  Processing...
                                </span>
                              </>
                            ) : (
                              "Approve"
                            )}
                          </Button>
                          <Button
                            variant="danger"
                            size="sm"
                            onClick={() => handleReject(request.user.id)}
                            disabled={processingIds.includes(request.user.id)}
                          >
                            {processingIds.includes(request.user.id) ? (
                              <>
                                <Spinner
                                  as="span"
                                  animation="border"
                                  size="sm"
                                  role="status"
                                  aria-hidden="true"
                                />
                                <span className="visually-hidden">
                                  Processing...
                                </span>
                              </>
                            ) : (
                              "Reject"
                            )}
                          </Button>
                        </div>
                      )}
                      {request.state === "approved" && (
                        <Button
                          variant="warning"
                          size="sm"
                          onClick={() => handleRevoke(request.user.id)}
                          disabled={processingIds.includes(request.user.id)}
                        >
                          {processingIds.includes(request.user.id) ? (
                            <>
                              <Spinner
                                as="span"
                                animation="border"
                                size="sm"
                                role="status"
                                aria-hidden="true"
                              />
                              <span className="visually-hidden">
                                Processing...
                              </span>
                            </>
                          ) : (
                            "Revoke Approval"
                          )}
                        </Button>
                      )}
                      {request.state === "rejected" && (
                        <Button
                          variant="success"
                          size="sm"
                          onClick={() => handleApprove(request.user.id)}
                          disabled={processingIds.includes(request.user.id)}
                        >
                          {processingIds.includes(request.user.id) ? (
                            <>
                              <Spinner
                                as="span"
                                animation="border"
                                size="sm"
                                role="status"
                                aria-hidden="true"
                              />
                              <span className="visually-hidden">
                                Processing...
                              </span>
                            </>
                          ) : (
                            "Approve"
                          )}
                        </Button>
                      )}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="6" className="text-center py-4">
                    {developerRequests.data.length === 0
                      ? "No developer requests found"
                      : "No requests on this page"}
                  </td>
                </tr>
              )}
            </tbody>
          </Table>

          {/* Pagination */}
          {developerRequests.data.length > 0 && (
            <Paginator
              currentPage={currentPage}
              totalItems={developerRequests.data.length}
              itemsPerPage={itemsPerPage}
              onPageChange={handlePageChange}
              maxPageButtons={5}
            />
          )}
        </>
      )}
    </div>
  );
}
