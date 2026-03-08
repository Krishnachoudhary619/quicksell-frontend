"use client";

import { useEffect, useState } from "react";
import { useStaff } from "@/hooks/useStaff";
import StaffList from "@/components/forms/StaffList";
import CreateStaffForm from "@/components/forms/CreateStaffForm";

export default function StaffPage() {
	const { staffList, getStaffList, createStaff, updateStaffStatus, loading, error } = useStaff();

	// Local state for the create form
	const [newName, setNewName] = useState("");
	const [newPhone, setNewPhone] = useState("");

	// Initial fetch
	useEffect(() => {
		getStaffList();
	}, [getStaffList]);

	const handleCreateSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		try {
			await createStaff(newName, newPhone);
			setNewName("");
			setNewPhone("");
			alert("Staff created successfully!");
		} catch (err) {
			console.error("Staff creation error:", err);
		}
	};

	const handleToggleStatus = async (id: string, is_active: boolean) => {
		try {
			await updateStaffStatus(id, is_active);
		} catch (err) {
			console.error("Status update error:", err);
		}
	};

	return (
		<main className='p-8'>
			<h1 className='text-2xl font-bold mb-6'>Staff Management</h1>

			{error && (
				<div className='bg-red-50 text-red-600 p-4 rounded-lg mb-6 font-medium'>
					{error}
				</div>
			)}

			<CreateStaffForm
				name={newName}
				phone={newPhone}
				onNameChange={setNewName}
				onPhoneChange={setNewPhone}
				onSubmit={handleCreateSubmit}
				loading={loading}
			/>

			<div className='mt-8'>
				<h3 className='text-lg font-semibold mb-4'>Existing Staff</h3>
				<StaffList
					staff={staffList}
					onToggleStatus={handleToggleStatus}
					loading={loading}
				/>
			</div>
		</main>
	);
}
